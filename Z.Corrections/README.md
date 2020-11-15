# Correction

## :one: Modifier les composants à tester 

:bulb: Malheureusement, les composants NativeScript ne suivent pas le DOM

* Ajouter au constructeur du composant `HomeComponent`, le parametre public suivant:

```typescript
    import { Component, ElementRef, OnInit } from "@angular/core";
    
...
    constructor(public elementRef: ElementRef) {
        // Use the component constructor to inject providers.
    }
```

Le script suivant remplace les lignes ci-dessus en mimiquant l'éditeur `vi`

```
$ ex src/app/home/home.component.ts <<EOF
   :%s/import { Component, OnInit }/import { Component, ElementRef, OnInit }/g
   :%s/constructor()/constructor(public elementRef: ElementRef)/g
   :wq
EOF
```

## :two: Créer l'environnement de test

* Dans le répertoire de votre projet, lancer la commande suivante 

:bookmark: Choisir le `testing framework` `Jasmine`

```
% ns test init --framework jasmine 
```

* Faire un test préalable

```
% ns test android --justlaunch
```

## :three: Ajouter les outils de tests (Testing Tools incluant le TestBed et la visualisation)

* Créer le fichier `test-main.ts`, comportant l'initialisation du TestBed avec le contenu suivant:

```typescript
cat << EOF > src/tests/test-main.ts
import { nsTestBedInit } from "@nativescript/angular/testing";
nsTestBedInit();
EOF
```

* Créer le fichier `test-utils.ts`, comportant la visualisation des composants non-DOM avec le contenu suivant:

```typescript
cat << EOF > src/tests/test-utils.ts
import { View } from "@nativescript/core/ui/core/view";
import { TextBase } from "@nativescript/core/ui/text-base";
import { Device } from "@nativescript/core/platform";

function getChildren(view: View): Array<View> {
    let children: Array<View> = [];
    (<any>view).eachChildView((child) => {
        children.push(child);
        return true;
    });
    return children;
}

export function dumpView(view: View, verbose: boolean = false): string {
    let nodeName: string = (<any>view).nodeName;
    if (!nodeName) {
        // Strip off the source
        nodeName = view.toString().replace(/(@[^;]*;)/g, '');
    }
    nodeName = nodeName.toLocaleLowerCase();

    let output = ["(", nodeName];
    if (verbose) {
        if (view instanceof TextBase) {
            output.push("[text=", view.text, "]");
        }
    }

    let children = getChildren(view).map((c) => dumpView(c, verbose)).join(", ");
    if (children) {
        output.push(" ", children);
    }

    output.push(")");
    return output.join("");
}

export function createDevice(os: string): typeof Device {
    return {
        os: os,
        osVersion: "0",
        deviceType: "Phone",
        language: "en",
        uuid: "0000",
        sdkVersion: "0",
        region: "US",
        manufacturer: "tester",
        model: "test device"
    };
}
EOF
```

## :four: Créer le test

* Home Component Test Script avec le contenu suivant:

```typescript
cat << EOF > src/tests/home.component.spec.ts
import "reflect-metadata";
import { 
    nsTestBedBeforeEach
    , nsTestBedAfterEach
    , nsTestBedRender
} from "@nativescript/angular/testing";

import {Component
    , ComponentRef
} from "@angular/core";

import {dumpView} from './test-utils';
import {HomeComponent} from "~/app/home/home.component";

describe("HomeComponent", () => {

    // const result = "(proxyviewcontainer (stacklayout (label), (label), (image)))";
    const label = "(label)";
    const image = "(image)";

    beforeEach(nsTestBedBeforeEach([HomeComponent]));
    afterEach(nsTestBedAfterEach());

    describe("HomeComponent", () => {
        it("should contain: label and image", () => {
            return nsTestBedRender(HomeComponent).then((fixture) => {
                const componentRef: ComponentRef<HomeComponent> = fixture.componentRef;
                const componentRoot = componentRef.instance.elementRef.nativeElement;
                const view = dumpView(componentRoot);
                expect(view).toContain(label);
                expect(view).toContain(image);
            });
        });
    });

});
EOF
```

* Page Component Test Script avec le contenu suivant:

```typescript
cat << EOF > src/tests/page.component.spec.ts
import "reflect-metadata";
import { 
    nsTestBedBeforeEach
    , nsTestBedAfterEach
    , nsTestBedRender
} from "@nativescript/angular/testing";

import {Component
    , ComponentRef
} from "@angular/core";

import {dumpView} from './test-utils';
import {HomeComponent} from "~/app/login/page/page.component";

describe("PageComponent", () => {

    // const result = "(proxyviewcontainer (stacklayout (button))";
    const button = "(button)";

    beforeEach(nsTestBedBeforeEach([PageComponent]));
    afterEach(nsTestBedAfterEach());

    describe("PageComponent", () => {
        it("should contain: button ", () => {
            return nsTestBedRender(PageComponent).then((fixture) => {
                const componentRef: ComponentRef<PageComponent> = fixture.componentRef;
                const componentRoot = componentRef.instance.elementRef.nativeElement;
                const view = dumpView(componentRoot);
                expect(view).toContain(button);
            });
        });
    });

});
EOF
```


## :grey_question: Ajouter le fichier `karma.conf.js` pour conserver les parametres de tests 


Le script suivant remplace les lignes ci-dessus en mimiquant l'éditeur `vi`

```
$ ex karma.conf.js <<EOF
   :%s/files: /files: ['src//tests//**//*.ts','src//tests//**//*.spec.ts',/g
   :wq
EOF
```

```
% git add --force karma.conf.js
```
