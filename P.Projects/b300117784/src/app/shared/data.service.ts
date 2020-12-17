import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    Produits: string;
    Services: string;
    description: string;
    Articles:string[];
    ImageArticles:string[];
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<DataItem>(
        {
            id: 1,
            Produits: "Consoles",
            Services: "Locations,Ventes,Depannage",
            description: "Description for Item 1",
            Articles:["PS4","XBOX","PS5","NITENDOSWITCH"],
            ImageArticles:["./img/Xbox.jpg","https://www.extremetech.com/wp-content/uploads/2011/11/XBox360-Feature.jpg"]
        },
        
            {
                id: 2,
                Produits: "Jeux",
                Services: "Locations,Ventes,",
                description: "Description for Item 1",
                Articles:["Fifa 2020","Wand Wars","Star Wars 2","Mario"],
                ImageArticles:[""]
            },
            {
                id: 3,
                Produits: "Services",
                Services: "Locations,Ventes,Depannage",
                description: "Description for Item 1",
                Articles:[""],
                ImageArticles:[""]
            },
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
