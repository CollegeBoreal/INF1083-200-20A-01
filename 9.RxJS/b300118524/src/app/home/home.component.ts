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

    constructor(private apiService: ApicallService){
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        //this.items = this._itemService.getItems();
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
