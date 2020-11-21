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

:one: Composant `Home`

- [ ] Modifier le template `home.component.html`

en changeant la ligne :

```html
  <Label class="page__content-placeholder" text="<!-- Page content goes here -->"></Label>
```

par 

```html
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

- [ ] Modifier le classe `home.component.ts`

en ajoutant les méthodes suivantes :

```typescript
    onAnimateLinear(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.linear
        });
    }
    
    onAnimateEaseIn(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeIn
        });}
    
    onAnimateEaseOut(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeOut
        });
    }
    
    onAnimateEaseInEaseOut(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeInOut
        });
    }
    
    onAnimateSpring(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.spring
        });
    }
    
    onAnimateCustom(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }
    
    onReset(view: View): void {
        view.translateX = 0;
        view.translateY = 0;
    }
```

- [ ] S'assurer que les librairies soient importées en conséquence

:keyboard: Dans [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md) Quick Fix -> `Ctrl .` :computer: Windows ou `⌘ .` :apple: MacOS

```
import { View } from "@nativescript/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
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
