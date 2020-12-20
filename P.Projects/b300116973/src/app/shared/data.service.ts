import { Injectable } from "@angular/core";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<IDataItem>(
        {
            id: 1,
            name: "Pizza Poops",
            description: "Pills Pizza Pops Pepperoni Pizza snacks 4 pizza",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/images/pizza%20pops.jpg",
        },
        {
            id: 2,
            name: "Janes Pub",
            description: "Janes Pub style chicken strips",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/images/janes%20pub.jpg",
        },
        {
            id: 3,
            name: "Mr.Noodles",
            description: "Mr.Noodles chicken Flavour instant noodles",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/images/mr%20noodle.jpg",
        }, 
        {
            id: 4,
            name: "activia yogurt",
            description: "Chapman's Yukon Cribou Vanilla, Caramel & Milk chocolate with Crispy Rice Pieces Ice Cream ",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/images/activia%20yogurt.jpg",
        },
       
        {
            id: 5,
            name: "Astro Original",
            description: "Balkan styles yogurt",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300116973/images/astroorifinal.jpg",
        }
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
