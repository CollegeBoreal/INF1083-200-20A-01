import { Component, OnInit } from "@angular/core";

import { DataService, IDataItem } from "../shared/data.service";
import { registerElement } from "@nativescript/angular";






@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<IDataItem>;

    constructor(private _itemService: DataService) { }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
    }
}
