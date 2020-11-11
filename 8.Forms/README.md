# 8.Forms

2 examples de `Forms` en NativeScript

## ReactiveForms

https://nativescript.org/blog/angular-10-support/

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hellow World                     |


:one: ReactiveForms

Open up home component template `home.component.html` replace `<GridLayout>` by the following :

```xml

<StackLayout [formGroup]="signUpForm">
    <TextField formControlName="email" hint="Email" keyboardType="email"></TextField>
    <TextField formControlName="username" hint="Username"></TextField>
    <Button text="sign up" (tap)="onButtonTap()"></Button>
</StackLayout>
```

* Add the `formBuilder` variable to the `home` component constructor

```typescript
    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }
``` 

* Add the `signUpForm: FormGroup;` attribute to the `home` component

```typescript
   signUpForm: FormGroup;
```

* Add the `signUpForm` initialization in `ngOnInit` method

```typescript
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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { ReactiveFormsModule} from "@angular/forms";
```

le rajouter à `@NgModule` le champ `import`

```
    imports: [
        NativeScriptFormsModule,
        ReactiveFormsModule,
```

```

NativeScriptFormsModule,
ReactiveFormsModule
```