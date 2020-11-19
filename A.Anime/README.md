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

```
// app.module.ts

import { NativeScriptAnimationsModule } from "@nativescript/angular/animations";

...
imports: [
  ...
  NativeScriptAnimationsModule
]
```


### Anime
https://github.com/m-abs/anime

https://github.com/juliangarnier/anime/issues/617

### Animation

https://docs.nativescript.org/ui/animation

https://nativescripting.com/posts/using-angular-animations-in-nativescript
