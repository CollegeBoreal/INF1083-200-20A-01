import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    Produits: string;
    Services: string;
    description: string;
    Articles:string[];
    image:string;
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
            image:"https://gamespot1.cbsistatic.com/uploads/original/43/434805/3126156-ps4_7000_01_withnotice.jpg",
            ImageArticles:["https://cdn.arstechnica.net/wp-content/uploads/2019/06/61V2zE6sA8L._AC_.jpg","https://technical-tips.com/assets/images/photos/1559448866.png","https://cdn.mos.cms.futurecdn.net/QjWZevdvUemHUVYNmwmZRA.jpg"]
    
    
        },
        
            {
                id: 2,
                Produits: "Jeux",
                Services: "Locations,Ventes,",
                description: "Description for Item 1",
                Articles:["Fifa 2020","Wand Wars","Star Wars 2","Mario"],
                image:"https://images.pushsquare.com/fc31113169077/best-new-ps4-games-at-gamescom-2018-playstation-4-1.original.jpg",
                ImageArticles:[""]
            },
            {
                id: 3,
                Produits: "Services",
                Services: "Locations,Ventes,Depannage",
                description: "Description for Item 1",
                Articles:[""],
                image:"https://img.generation-nt.com/best-of-jeux-video-2014-top_041A02BC01617483.jpg",
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
