# rxjs

https://rxjs-dev.firebaseapp.com/guide/overview


## Examples

https://www.pluralsight.com/guides/using-http-with-rxjs-observables


# :o: Construire un accès à des données

* Le projet utilise deux modules externes `HttpModule` et `FormsModule` de type [Template Driven Forms](https://angular.io/guide/forms-overview#setup-in-template-driven-forms)

<image src="images/httpmodule.png" width="630" heigth="347"></image>

* Récupérer votre clé [RapidAPI](https://rapidapi.com/) pour l'accès aux bases de données

<image src="images/RapidAPIKey.png" width="453" heigth="283"></image>


### :a: Créer un projet, avec b`<`votre :id:`>` comme nom de projet

:pushpin: par example le nom du projet sera `b300098957` 

* Création utilisant un autre [template](https://github.com/NativeScript/nativescript-app-templates)

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-tab-navigation-ng`    |  Application avec onglets         |


## :b: Créer le service

##### :warning: Installer [NS Schematics](https://github.com/CollegeBoreal/Tutoriels/blob/master/W.Web/T.NativeScript/Schematics.md) pour pouvoir genérer le service et les classes

```
$ npm install @schematics/angular @nativescript/schematics tslint --save-dev
```

:pushpin: Créer la classe `Country`

- [ ] Génerer la classe

```
% ng generate class shared/country --skipTests=true 
```


- [ ]  Rajouter les champs

```typescript
export class Country {
    id: number;
    name: string;
    capital: string;
}
```

:pushpin: Créer le service `APICall`

- [ ] Génerer le service

```
% ng generate service shared/apicall --skipTests=true 
```

- [ ] Rajouter le constructeur se connectant au Module `HttpModule`

```typescript
constructor(private httpClient: HttpClient) {}
```

- [ ] Rajouter la fonction search se connectant au Module `HttpModule` et fournir votre clé Rapid-API

```typescript
    searchCountryByName(name: string): Observable<Country[]>{
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append(
            'X-RapidAPI-Key',
            '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
        );
        return this.httpClient.get(
            `https://restcountries-v1.p.rapidapi.com/capital/` + name,
            {headers: headers}
        ).pipe(
            map((data: Country[]) => {
                return data;
            }), catchError( error => {
                return throwError( 'Capital not found!' );
            })
        )
    }
```

- [ ] Rajouter les autres modules par importer au début du fichier ou utiliser `QuickFix`

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from "rxjs/operators";
import { Country } from './country';
```

:bulb: Résultat final

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from "rxjs/operators";
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  searchCountryByName(name: string): Observable<Country[]>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append(
        'X-RapidAPI-Key',
        '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
    );
    return this.httpClient.get(
        `https://restcountries-v1.p.rapidapi.com/capital/` + name,
        {headers: headers}
    ).pipe(
        map((data: Country[]) => {
            return data;
        }), catchError( error => {
            return throwError( 'Capital not found!' );
        })
    )
  }
}
```

:pushpin: Rajouter le module `NativeScriptHttpClientModule` à `app.module.ts`

```
import { NativeScriptHttpClientModule } from "@nativescript/angular";
```

le rajouter à `@NgModule` le champ (propriété) `imports`

```
    imports: [
        NativeScriptHttpClientModule,
```

## :ab: Créer le formulaire



:pushpin: Éditer le composant `Home` - `search.component.ts`

- [ ] Ajouter les variables `name` et `countries`

```typescript
    name: string;
    countries: Array<Country>;
```

- [ ] Modifier le constructeur en lui passant le service `Apicall`

```typescript
    constructor(private apiService: ApicallService){
        // Use the component constructor to inject providers.
    }
```

- [ ] Importer le service `Apicall` dans le component `SearchComponent`

```typescript
import { ApicallService } from "../shared/apicall.service";
import { Country } from "../shared/country";
```

- [ ] Ajouter la fonction `searchCapital` permettant l'appel au service en passant la capitale après la fonction `ngOnInit()`

```typescript
    searchCapital() {
        this.apiService
            .searchCountryByName(this.name)
            .subscribe((data:Country[]) => {
                console.log(data);
                this.countries = data;
            });
    }
```

:bulb: Résultat final


```typescript
import { Component, OnInit } from "@angular/core";
import { ApicallService } from "../shared/apicall.service";
import { Country } from "../shared/country";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    name: string;
    countries: Array<Country>;

    constructor(private apiService: ApicallService) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    searchCapital() {
        this.apiService
            .searchCountryByName(this.name)
            .subscribe((data:Country[]) => {
                console.log(data);
                this.countries = data;
            });
    }
}
```

:pushpin: Éditer le `template` du composant `Search` - `search.component.html`

Remplacer :

```html
    <Label class="page__content-placeholder" text="<!-- Search page content goes here -->"></Label>
```

avec :

```html
    <StackLayout class="form" >

        <TextField class="input" hint="Capital" [(ngModel)]="name"></TextField>
    
        <Button text="Search" class="btn btn-primary" (tap)="searchCapital()"></Button>
    
        <ListView [items]="countries" height="650">
            <ng-template let-item="item">
                <StackLayout>
                    <Label [text]="item.name"></Label>
                    <Label [text]="item.capital"></Label>
                </StackLayout>
            </ng-template>
        </ListView>
    
    </StackLayout>
```

:tada: Observez l'utilisation de la variable `name`, `countries` et la fonction `searchCapital`

Binding with [Template Reference Variable](https://angular.io/guide/template-syntax#template-reference-variables--var-) usually called #name

⚠️ #name reference variable can only be used in the template not by the controller

🔖 ngForm is used to link the reference variable to the entire form (i.e. form.invalid)

🔖 ngModel is used to link the reference variable to the <Input> form field (i.e. phone.touched)

:pushpin: Finalement rajouter le module `NativeScriptFormsModule` à `search.module.ts`

```
import { NativeScriptFormsModule } from "@nativescript/angular"
```

le rajouter à `@NgModule` le champ `import`

```
    imports: [
        NativeScriptFormsModule,
```

# References:

https://docs.nativescript.org/angular/ng-framework-modules/http

https://discourse.nativescript.org/t/reactive-forms-not-working/3044/5
