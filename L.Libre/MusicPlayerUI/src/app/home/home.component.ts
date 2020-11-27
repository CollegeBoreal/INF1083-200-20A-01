import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { SearchBar } from "@nativescript/core/ui/search-bar";


@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    textFieldValue: string = "";

    onButtonTap(): void {
        console.log("Button was pressed");
    }

    searchPhrase: string;
    onSearchSubmit(args): void {
        let searchBar = <SearchBar>args.object;
        console.log("You are searching for " + searchBar.text);
    }


    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    onTaylorSwiftTap(): void {
        this.routerExtensions.navigate(["/detail"]);
    }
}
