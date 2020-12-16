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
            image: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/src/app/shared/image/pizza%20pops.jpg",
        },
        {
            id: 2,
            name: "Janes Pub",
            description: "Janes Pub style chicken strips",
            image: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/src/app/shared/image/janes%20pub.jpg",
        },
        {
            id: 3,
            name: "Mr.Noodles",
            description: "Mr.Noodles chicken Flavour instant noodles",
            image: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/src/app/shared/image/mr%20noodle.jpg",
        }, 
        {
            id: 4,
            name: "Chapman's Yukon Caribou",
            description: "Chapman's Yukon Cribou Vanilla, Caramel & Milk chocolate with Crispy Rice Pieces Ice Cream ",
            image: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/src/app/shared/image/sandwich.jpg",
        },
       
        {
            id: 5,
            name: "Astro Original",
            description: "Balkan styles yogurt",
            image: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/src/app/shared/image/astroorifinal.jpg",
        }
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
