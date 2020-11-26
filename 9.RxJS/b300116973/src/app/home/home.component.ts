import { Component, OnInit } from "@angular/core";

import { ApicallService } from "../shared/apicall.service";
import { Country } from "../shared/country";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
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
