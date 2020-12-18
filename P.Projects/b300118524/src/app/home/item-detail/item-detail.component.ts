import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { View } from "@nativescript/core";

import { DataService, DataItem } from "../../shared/data.service";

@Component({
    selector: "ItemDetail",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: DataItem;

    constructor(
        private _data: DataService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params.id;
        this.item = this._data.getItem(id);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
    
    animate(view: View) {
        
        view.animate({
            scale: { x: 2, y: 2},
            duration: 3000
        })
        .then(() => view.animate({
             scale:{x: 1, y: 1 },
             duration:3000
        })
        .then(() => {
            console.log("Animation finished");
        })
        .catch((e) => {
            console.log(e.message);
        }));
    } 
}
