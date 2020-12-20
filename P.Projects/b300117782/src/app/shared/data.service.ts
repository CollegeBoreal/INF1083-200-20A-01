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
            name: "Beignet, haricot, boullir",
            description: "Beignet fait a base de farine ble de l'eau et du sucre, haricot rouge sautee, boullir de mais"
            avatar: "https://assets.ikwen.com/tchopetyamo/blog/blog_img/fiances-21_pSKnDcc.small_4NQJTr3.png"
        },
        {
            id: 2,
            name: "poulet okk",
            description: "poulet fait au four"
            avatar:"https://assets.ikwen.com/tchopetyamo/blog/blog_img/morceau-de-poulet-okk.small_GNxBfsb.png"
        },
        {
            id: 3,
            name: "jus de jara",
            description: "jus fait abase de jara"
            avatar: "https://assets.ikwen.com/tchopetyamo/blog/blog_img/jus-de-jara1.small_3yQsHAc.png"
        },
        {
            id: 4,
            name: "jus de fruit",
            description: "jus fait abase de fruits bio"
            avatar: "https://assets.ikwen.com/tchopetyamo/blog/blog_img/temple-anniversaire-oups1.small_cMtwTxy.png"
        }
        
            
            
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
