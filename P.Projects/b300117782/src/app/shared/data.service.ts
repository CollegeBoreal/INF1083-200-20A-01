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
            description: "Beignet fait a base de farine ble de l'eau et du sucre, haricot rouge sautee, boullir de mais",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300117782/images/cc1.jpg?raw=true",
        },
        {
            id: 2,
            name: "poulet okk",
            description: "poulet fait au four",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300117782/images/cc2.png?raw=true",
        },
        {
            id: 3,
            name: "jus de jara",
            description: "jus fait abase de jara",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300117782/images/cc3.png?raw=true",
        },
        {
            id: 4,
            name: "jus de fruit",
            description: "jus fait abase de fruits bio",
            avatar: "https://github.com/CollegeBoreal/INF1083-200-20A-01/blob/master/P.Projects/b300117782/images/cc4.png?raw=true",
        }
        
            
            
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
