import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    name: string;
    description: string;
    image: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<DataItem>(
        {
            id: 1,
            name: "Pizza Poops",
            description: "Pills Pizza Pops Pepperoni Pizza snacks 4 pizza",
            image: "src\app\shared\image\logo.png",
        },
        {
            id: 2,
            name: "Janes Pub",
            description: "Janes Pub style chicken strips",
            image: "src\app\shared\image\janes pub.jpg",
        },
        {
            id: 3,
            name: "Mr.Noodles",
            description: "Mr.Noodles chicken Flavour instant noodles",
            image: "src\app\shared\image\mr noodle.jpg",
        }, 
        {
            id: 4,
            name: "Chapman's Yukon Caribou",
            description: "Chapman's Yukon Cribou Vanilla, Caramel & Milk chocolate with Crispy Rice Pieces Ice Cream ",
            image: "src\app\shared\image\sandwich.jpg",
        },
       
        {
            id: 5,
            name: "Astro Original",
            description: "Balkan styles yogurt",
            image: "src\app\shared\image\astroorifinal.jpg",
        }
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
