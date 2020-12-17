
import { Injectable } from "@angular/core";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
    image:string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<IDataItem>(
        {
            id: 1,
            name: "Management",
            description: "numéro de Téléphone:647-838-4239",
            image:"https://resources.workable.com/wp-content/uploads/2015/12/call-center-manager.jpg"
            
           
        },
        {
            id: 2,
            name: "Service de logiciel ",
            description: "Mise à Jour, Installation ",
            image: "https://www.getsoftwareservice.com/wp-content/uploads/2019/04/quality-assurance-home.jpg"
           
             
        },
        {
            id: 3,
            name: "sevice de Sécurité",
            description: "service de Par-feu",
            image: "data:image/jpeg;base64,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",
            

        },
        {
            id: 4,
            name: "Service Materiel",
            description: "Troubleshooting",
            image: "https://betanews.com/wp-content/uploads/2016/10/Software-as-a-service-SaaS-e1477048602819.jpg"
            

        },
       
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
