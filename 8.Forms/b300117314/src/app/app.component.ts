import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
export class Country {
    id: number;
    name: string;
    capital: string;
}

