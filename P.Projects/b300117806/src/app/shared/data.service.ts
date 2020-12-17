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
            avatar:"https://www.yvesrocher.ca/medias/?context=bWFzdGVyfGltYWdlc3w2MTU1MTR8aW1hZ2UvcG5nfHN5c19tYXN0ZXIvaW1hZ2VzL2gyNS9oY2YvODg4Nzg5Mzk1MDQ5NHxlZTkxZjMzNzYzOTk5YjNiZjVlZDFmNGEzZWMzYWE3YzlmNjA3YjRlNzNmMGZhM2YyYTYzZDczYzRhODRlNmY2&width=295&height=295"
        },
        {
            id: 2,
            name: "creme de nuit",
            description: "pour votre beauté",
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRExDTldc2fsjZBAK7sTr_4WpROkdLSkNt4zA&usqp=CAU"

        },
        {
            id: 3,
            name: "savon",
            description: "nettoyant visage",
            avatar:"https://www.monsitebeaute.com/var/images/produits/page_MSB0016958.jpg"
        },
        {
            id: 4,
            name: "huile ricin",
            description: "nettoyer en profondeur",
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxrWYgbM2QHIkbtjrKG6EstS1Nd-nsHgI_Dw&usqp=CAU"
        }
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
