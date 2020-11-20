# Anime


### :a: Créer un projet, avec b`<`votre :id:`>` comme nom de projet

:pushpin: par example le nom du projet sera `b300098957` 

* Création utilisant un autre [template](https://github.com/NativeScript/nativescript-app-templates)

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hello World                      |

:+1: Naviguer vers votre projet et pour l'éditer avec :keyboard: [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md), taper:

```
$ code .
```

:one: Ajouter la librairie animation au projet

- [ ] par le CLI

```
$ npm install @angular/animation --save
```

- [ ] par le module `app.module.ts`

```typescript
// app.module.ts

import { NativeScriptAnimationsModule } from "@nativescript/angular/animations";

...
imports: [
  ...
  NativeScriptAnimationsModule
]
```


```
$ ng generate directive directives/touch-scale-animation --skipTests=true
```

```typescript
import { Component, OnInit } from "@angular/core";

import { Page } from "@nativescript/core/ui/page";
import { View } from "@nativescript/core/ui/core/view";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    view: View;

    constructor(private page: Page) {
        // Use the component constructor to inject providers.
        // Init your component properties here.
        this.view = page.getViewById<View>("view");
    }

    ngOnInit(): void {
    }

    onAnimateLinear(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.linear
        });
    }
    
    onAnimateEaseIn(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeIn
        });}
    
    onAnimateEaseOut(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeOut
        });
    }
    
    onAnimateEaseInEaseOut(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeInOut
        });
    }
    
    onAnimateSpring(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.spring
        });
    }
    
    onAnimateCustom(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }
    
    onReset(): void {
        this.view.translateX = 0;
        this.view.translateY = 0;
    }
}
```

```xml
<ActionBar>
    <Label text="Home"></Label>
</ActionBar>

<ScrollView>
    <StackLayout>
      <Button text="Linear" tap="onAnimateLinear"></Button>
      <Button text="EaseIn" tap="onAnimateEaseIn"></Button>
      <Button text="EaseOut" tap="onAnimateEaseOut"></Button>
      <Button text="EaseInEaseOut" tap="onAnimateEaseInEaseOut"></Button>
      <Button text="Spring" tap="onAnimateSpring"></Button>
      <Button text="Custom" tap="onAnimateCustom"></Button>
      <Button text="Reset" tap="onReset"></Button>
      <AbsoluteLayout width="300" height="200" clipToBounds="true" backgroundColor="LightGray">
        <Image id="view" src="res://icon" width="100" height="100" left="100" top="0"></Image>
      </AbsoluteLayout>
    </StackLayout>
</ScrollView>
```

### Anime
https://github.com/m-abs/anime

https://github.com/juliangarnier/anime/issues/617

### Animation

https://docs.nativescript.org/ui/animation

https://nativescripting.com/posts/using-angular-animations-in-nativescript

https://nativescripting.com/posts/animations-using-angular-directives
