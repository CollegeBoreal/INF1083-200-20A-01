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
            name: "Face Mask and Creme de Jour",
            description: "Description for Item 1",
            avatar: "https://www.monvanityideal.com/data/produits/37/43/u/juvaflorine-masque-purifiant-argile-849e6aeb7e1d7a99dd9e11cbf1827f2a.jpg"
        },
        {
            id: 2,
            name: "Body Cream",
            description: "Description for Item 2",
            avatar: "https://www.cocooninglove.com/wp-content/uploads/2017/11/A13_Exfoliant-fouette-Abricot-1.jpg"
        },
        {
            id: 7,
            name: "Relaxation & Massage",
            description: "Description for Item 7",
            avatar:"https://static1.squarespace.com/static/5e35fdfa8e5e5b2d211cd1bb/t/5ea6d86c192a052e37bdf3b3/1587992685574/1.jpg"
        },
        {
            id: 8,
            name: "Yoga Bikram",
            description: "Description for Item 8",
            avatar:"https://www.verywellfit.com/thmb/Zy3X7gStpSbz8N-cQKrDA4HMBb0=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bikramclass-56aa42425f9b58b7d0035c9d.jpg"
    
        
        }
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
