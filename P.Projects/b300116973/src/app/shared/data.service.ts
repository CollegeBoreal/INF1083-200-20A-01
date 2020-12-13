import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    name: string;
    description: string;
    avatar: string;
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
            avatar: "http://cdn.simplesite.com/i/6d/62/284289732112114285/i284289739537574875._rsw480h480_szw480h480_.jpg",
        },
        {
            id: 2,
            name: "Janes Pub",
            description: "Janes Pub style chicken strips",
            avatar: "http://cdn.simplesite.com/i/6d/62/284289732112114285/i284289739537574888._rsw480h480_szw480h480_.jpg",
        },
        {
            id: 3,
            name: "Mr.Noodles",
            description: "Mr.Noodles chicken Flavour instant noodles",
            avatar: "http://cdn.simplesite.com/i/6d/62/284289732112114285/i284289739537574890._rsw480h480_szw480h480_.jpg",
        }, 
        {
            id: 4,
            name: "Chapman's Yukon Caribou",
            description: "Chapman's Yukon Cribou Vanilla, Caramel & Milk chocolate with Crispy Rice Pieces Ice Cream ",
            avatar: "http://cdn.simplesite.com/i/6d/62/284289732112114285/i284289739537574893._rsw480h480_szw480h480_.jpg",
        },
       
        {
            id: 5,
            name: "Astro Original",
            description: "Balkan styles yogurt",
            avatar: "http://cdn.simplesite.com/i/6d/62/284289732112114285/i284289739537574906._rsw480h480_szw480h480_.jpg",
        }
      

        
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
