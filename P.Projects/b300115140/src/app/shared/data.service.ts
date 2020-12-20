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
            description: "Choose our most popular face cream",
            avatar: "https://i.ytimg.com/vi/daUmGF8vPNc/maxresdefault.jpg"
        },
        {
            id: 2,
            name: "Body Cream",
            description: "This lavender body cream",
            avatar: "https://www.cocooninglove.com/wp-content/uploads/2017/11/A13_Exfoliant-fouette-Abricot-1.jpg"
        },
        {
            id: 3,
            name: "Relaxation & Massage",
            description: "Take a reak for a full hour of swedish massage",
            avatar:"https://www.msccollege.edu/wp-content/uploads/2019/02/swedish-massage-1024x683.jpg"
        },
        {
            id: 4,
            name: "Yoga Bikram",
            description: "Yoga with a heated room and relaxation!",
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
