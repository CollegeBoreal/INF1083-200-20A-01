import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    name: string;
    description: string;
    image: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<DataItem>(
        {
            id: 1,
            name: "Pascale Siakam",
            description: "Description for Item 1",
            image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3149673.png&w=350&h=254"
        },
        {
            id: 2,
            name: "Kyle Lowry",
            description: "Description for Item 1",
            image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3012.png&w=350&h=254"
        },
        
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
