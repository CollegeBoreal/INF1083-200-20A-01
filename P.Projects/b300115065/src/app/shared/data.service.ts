import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<DataItem>(
        {
            id: 1,
            name: "Sport Car",
            description: "Aston Martin DBS"
            avatar: "https://www.cars.com/research/aston_martin-dbs-2021/"
        },
        {
            id: 2,
            name: "Luxury Car",
            description: "Acura RDX"
            avatar: "https://www.cars.com/research/acura-rdx-2021/"
        },
        {
            id: 3,
            name: "Pickup Truck",
            description: "Nissan NV Passenger"
            avatar: "https://www.cars.com/research/nissan-nv_passenger_nv3500_hd-2021/"
        },
        {
            id: 4,
            name: "Mini Van",
            description: "RAM ProMaster 2500"
            avatar: "https://www.cars.com/research/ram-promaster_2500_window_van-2021/"
        }
        
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
