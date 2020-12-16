import { Injectable } from "@angular/core";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
    avatar:string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<IDataItem>(
        {
            id: 1,
            name: "creme",
            description: "creme de jour",
            avatar:""
        },
        {
            id: 2,
            name: "Item 2creme de nuit",
            description: "pour votre beauté",
            avatar:""

        },
        {
            id: 3,
            name: "savon",
            description: "nettoyant visage3",
            avatar:""
        },
        {
            id: 4,
            name: "huile ricin",
            description: "nettoyer en profondeur",
            avatar:""
        }
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
