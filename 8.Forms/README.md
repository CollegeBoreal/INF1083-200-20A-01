# 8.Forms

## [Participation](.scripts/Participation.md)

2 examples de [`Forms`](https://angular.io/guide/forms) en Angular:

- [ ] [ReactiveForms](https://angular.io/guide/forms-overview#setup-in-reactive-forms) - ce module

- [ ] [Template Driven Forms](https://angular.io/guide/forms-overview#setup-in-template-driven-forms) - le module `RxJS`


## ReactiveForms

https://nativescript.org/blog/angular-10-support/

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hello World                     |


:zero: Naviguer vers votre projet et pour l'éditer avec :keyboard: [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md), taper:

```
$ code .
```

:one: ReactiveForms

Open up home component template `home.component.html` replace `<GridLayout>` by the following :

:keyboard: Dans [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md) Ouvrir un fichier -> `Ctrl p` :computer: Windows ou `⌘ p` :apple: MacOS


```xml

<StackLayout [formGroup]="signUpForm">
    <TextField formControlName="email" hint="Email" keyboardType="email"></TextField>
    <TextField formControlName="username" hint="Username"></TextField>
    <Button text="sign up" (tap)="onButtonTap()"></Button>
</StackLayout>
```

:bulb: [Angular Event Binding](https://angular.io/guide/event-binding)

<img src="https://angular.io/generated/images/guide/template-syntax/syntax-diagram.svg"><img>

* Add the `formBuilder` variable to the `home` component constructor

```typescript
    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }
``` 

:keyboard: Dans [vsc](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/IDE.md) Quick Fix -> `Ctrl .` :computer: Windows ou `⌘ .` :apple: MacOS

* Add the `signUpForm: FormGroup;` attribute to the `home` component

```typescript
   signUpForm: FormGroup;
```

* Add the `signUpForm` initialization in `ngOnInit` method

```typescript
        // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["", Validators.required],
            username: ["", Validators.required],
        });
```

* Add the `onButtonTap` method 

```typescript
    onButtonTap() {
        console.log(JSON.stringify(this.signUpForm.value));
    }
```

:bulb: Final Result

```typescript
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["", Validators.required],
            username: ["", Validators.required],
        });
    }

    onButtonTap() {
        console.log(JSON.stringify(this.signUpForm.value));
    }
}
```

:two: Add the `forms` providers to the `home` module file `home.module.ts`

:pushpin: Finalement rajouter le module `NativeScriptFormsModule` à `home.module.ts` et le module `ReactiveFormsModule`

```
import { NativeScriptFormsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from "@angular/forms";
```

le rajouter à `@NgModule` le champ `import`

```
    imports: [
        NativeScriptFormsModule,
        ReactiveFormsModule,
```

:bulb: Final Result

```typescript
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
```
