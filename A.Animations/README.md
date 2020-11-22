# Animations


### :a: Créer un projet, avec b`<`votre :id:`>` comme nom de projet

:pushpin: par example le nom du projet sera `b300098957` 

* Création utilisant un autre [template](https://github.com/NativeScript/nativescript-app-templates)

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-drawer-navigation-ng` |  Tiroirs, Angular et SaSS         |

:+1: Naviguer vers votre projet et pour l'éditer avec :keyboard: [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md), taper:

```
$ code .
```

### :b: [CSS Animation](https://docs.nativescript.org/ui/animation-css.html)


:one: Composant `Home`

- [ ] Modifier le template `home.component.html`


en changeant la ligne :

```html
  <Label class="page__content-placeholder" text="<!-- Page content goes here -->"></Label>
```

par 

```html
  <Button text="{N}" class="background" ></Button>
```

- [ ] Ajouter un nouveau fichier de styles `scss`

* :keyboard: [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md), taper: `Ctrl N` sous Windows ou `⌘ N` sous MacOS

```css
@keyframes bgAnimation {
    from { background-color: red; }
    to { background-color: green; }
}
.background {
    animation-name: bgAnimation;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}
```

* :keyboard: [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md), taper: `Ctrl S` sous Windows ou `⌘ S` sous MacOS

et donner le nom de fichier `home.component.scss`

- [ ] Modifier la classe du composant `Home` 

* :keyboard: [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md), taper: `Ctrl P` sous Windows ou `⌘ P` sous MacOS - ouvrir le fichier `home.component.ts`

ajouter la propriété `styleUrls` qui est une liste et peux comprendre plusieurs fichiers `scss`

```typescript
@Component({
    ... ,
    styleUrls: ["./home.component.scss"]
})
```

:bulb: Final Result

```typescript
import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

}
```



### Anime
https://github.com/m-abs/anime

https://github.com/juliangarnier/anime/issues/617

### Animation

https://docs.nativescript.org/ui/animation

https://nativescripting.com/posts/using-angular-animations-in-nativescript

https://nativescripting.com/posts/animations-using-angular-directives


### Gesture

https://docs.nativescript.org/angular/ui/ng-components/gestures
