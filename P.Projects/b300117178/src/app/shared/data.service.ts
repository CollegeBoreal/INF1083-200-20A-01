import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    name: string;
    country:string;
    followers:number;
    image:string;
    song:string[];
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<DataItem>(
        {
            id: 1,
            name: "Davido",
            country:"Nigeria",
            followers:7000,
            image:"https://i.scdn.co/image/514eccbc5590f1bc07538506b2a52519854686ef",
            song:["Fia","Owo Baba Olowo","Son of Mercy","A Good Time"]

        },
        {
            id: 2,
            name: "Burna Boy",
            country:"Nigeria",
            followers:6500,
            image:"https://dancingastronaut.com/wp-content/uploads/2020/07/Burna-Boy-Parallax-e1593785681933.jpg",
            song:["outside","Twicw As Tall","Africa Giant"]

        }
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
