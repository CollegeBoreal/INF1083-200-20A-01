import { Component, OnInit } from "@angular/core";

import { DataService, DataItem } from "../shared/data.service";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls:["./home.component.css"]
})
export class HomeComponent implements OnInit {
    items: Array<DataItem>;
    state:string;
    

    constructor(private _itemService: DataService) { }

    ngOnInit(): void {
        
        this.items = this._itemService.getItems();
        this.state="Pause";
        
    }
    onTap(): void {
        if(this.state=="Pause"){
            this.state="Play";
    
        }else{
                this.state="Pause";
        }

}
}
