import { Component, OnInit } from "@angular/core";
import { WellnessapicallService } from "../shared/wellnessapicall.service";
import { Product } from "../shared/product";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    name: string;
    countries: Array<Product>;

    constructor(private apiService: WellnessapicallService) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    searchCapital() {
        this.apiService
            .searchCountryByName(this.name)
            .subscribe((data:Product[]) => {
                console.log(data);
                this.countries = data;
            });
    }
}