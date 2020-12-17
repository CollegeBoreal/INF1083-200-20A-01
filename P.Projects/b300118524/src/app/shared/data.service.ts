import { Injectable } from "@angular/core";

export interface DataItem {
    id: number;
    name: string;
    description: string;
    nationalite: string;
    age: string;
    taille: string;
    poste: string;
    shirtnumber: string;
    but: string;
    assist: string;
    salaire: string;
    photo: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<DataItem>(
        
        {
            id: 1,
            name: "Marc-André Ter Stegen",
            description: "Stats de tout le temps sur Marc Ter Stegen",
            nationalite: "Équipe Nationale : Allemagne",
            age: "âge: 28 ans",
            taille: "Taille : 1,87 m",
            poste: "poste sur le terrain : Gardien",
            shirtnumber: "Numéro de  maillot : 1",
            but:"buts avec Fc Barcelone  :  0",
            assist:"buts assistés avec Fc Barcelone : 2",
            salaire: "Salaire annuel:  6M euro",
            photo: "https://cdn.vox-cdn.com/thumbor/hGDL_uYmDAbbiO_S37M3EmaqtIg=/0x0:4156x2771/1200x800/filters:focal(1625x44:2289x708)/cdn.vox-cdn.com/uploads/chorus_image/image/65277207/1169394850.jpg.0.jpg"
        },
        {
            id: 2,
            name: "Neto",
            description: "Stats de tout le temps sur Neto",
            nationalite: "Équipe Nationale : Brésil",
            age: "âge: 31 ans",
            taille: "Taille : 1,9 m",
            poste: "Poste sur le terrain : Attaquant",
            shirtnumber: "Numéro de  maillot : 13",
            but:"buts avec Fc Barcelone  : 27",
            assist:"buts assistés avec Fc Barcelone : 73",
            salaire: "Salaire annuel:  4,5 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/01/22/fe5cc94d-5f62-4280-9aff-98779729eff1/WhatsApp-Image-2020-01-22-at-21.47.35.jpeg?width=640&height=400"
        },
        {
            id: 3,
            name: "Gerard Piqué",
            description: "Stats de tout le temps sur Gerard Piqué ",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 33 ans",
            taille: "Taille : 1,94 m",
            poste: "poste sur le terrain : Défenceur central",
            shirtnumber: "Numéro de  maillot : 3",
            but:"buts avec Fc Barcelone  : 48",
            assist:"buts assistés avec Fc Barcelone  : 7",
            salaire: "Salaire annuel:  11 M euro",
            photo: "https://pbs.twimg.com/media/EmBAZBHWoAA7YTS.jpg"
        },
        {
            id: 4,
            name: "Clément Lenglet",
            description: "Stats de tout le temps sur Clément Lenglet ",
            nationalite: "Équipe Nationale : France",
            age: "âge: 25 ans",
            taille: "Taille : 1,9 m",
            poste: "Poste sur le terrain : Défenceur central",
            shirtnumber: "Numéro de  maillot : 15",
            but:"buts avec Fc Barcelone  : 11",
            assist:"buts assistés avec Fc Barcelone  : 1",
            salaire: "Salaire annuel: 3,9 M euro",
            photo: "https://assets.laliga.com/squad/2020/t178/p171101/2048x2225/p171101_t178_2020_1_001_000.png"
        },
        {
            id: 5,
            name: "Jordi Alba",
            description: "Stats de tout le temps sur Jordi Alba",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 31 ans",
            taille: "Taille : 1,7 m",
            poste: "Poste sur le terrain : Défenceur Latéral Gauche",
            shirtnumber: "Numéro de  maillot : 18",
            but:"buts avec Fc Barcelone  : 17",
            assist:"buts assistés avec Fc Barcelone  : 65",
            salaire: "Salaire annuel:  11 M euro",
            photo: "https://assets.laliga.com/squad/2020/t178/p52356/2048x2048/p52356_t178_2020_1_002_000.jpg"
        },
        {
            id: 6,
            name: "Junior Firpo",
            description: "Stats de tout le temps sur Junior Firpo",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 24 ans",
            taille: "Taille : 1,84 m",
            poste: "Poste sur le terrain : Défenceur Latéral Gauche",
            shirtnumber: "Numéro de  maillot : 24",
            but:"buts avec Fc Barcelone  : 1",
            assist:"buts assistés avec Fc Barcelone : 1",
            salaire: "Salaire annuel:  0,9 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/b4456ea6-c430-4da7-80c3-00fb43928dd6/mini_1920x1080-firpo.png?width=670&height=790"
        },
        {
            id: 7,
            name: "Sergino Dest",
            description: "Stats de tout le temps sur Sergino Dest",
            nationalite: "Équipe Nationale : USA",
            age: "âge: 20 ans",
            taille: "Taille : 1,75 m",
            poste: "Poste sur le terrain : Défenceur Latéral Droit",
            shirtnumber: "Numéro de  maillot : 2",
            but:"buts avec Fc Barcelone  : 1",
            assist:"buts assistés avec Fc Barcelone : 0",
            salaire: "Salaire annuel:  1,4 M euro",
            photo: "https://images.news18.com/ibnlive/uploads/2020/10/1601554219_sports-66.png"
        },
        {
            id: 8,
            name: "Sergi Roberto",
            description: "Stats de tout le temps sur Sergi Roberto",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 28 ans",
            taille: "Taille : 1,76 m",
            poste: "Poste sur le terrain : Défenceur Latéral Droit",
            shirtnumber: "Numéro de  maillot : 20",
            but:"buts avec Fc Barcelone  : 10",
            assist:"buts assistés avec Fc Barcelone  : 36",
            salaire: "Salaire annuel:  5,2 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/08/5d4025c1-9eb4-4c77-a401-7e480f6eb74a/mini_SERGI-ROBERTO.png?width=670&height=790"
        },
        {
            id: 9,
            name: "Ronald Araujo",
            description: "Stats de tout le temps sur Ronald Araujo",
            nationalite: "Équipe Nationale : Uruguay",
            age: "âge: 21 ans",
            taille: "Taille : 1,91 m",
            poste: "Poste sur le terrain : Défenceur  Central",
            shirtnumber: "Numéro de  maillot : 4",
            but:"buts avec Fc Barcelone  : 0",
            assist:"buts assistés avec Fc Barcelone : 0",
            salaire: "Salaire annuel:  1,4 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/311d0cd4-1a31-4bc3-9c0a-796749f9556c/mini_1920x1080-araujo.png?width=670&height=790"
        },
        {
            id: 10,
            name: "Samuel Umtiti",
            description: "Stats de tout le temps sur Samuel Umtiti",
            nationalite: "Équipe Nationale : France",
            age: "âge: 27 ans",
            taille: "Taille : 1,82 m",
            poste: "Poste sur le terrain : Défenceur Central ",
            shirtnumber: "Numéro de  maillot : 23",
            but:"buts avec Fc Barcelone  : 2",
            assist:"buts assistés avec Fc Barcelone : 1",
            salaire: "Salaire annuel: 7,9 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/87017fcc-de4e-4c1d-9239-f4910c4fe145/mini_1920x1080-umtiti.png?width=624&height=368"
        },
        {
            id: 11,
            name: "Sergio Busquets",
            description: "Stats de tout le temps sur Sergio Busquets",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 32 ans",
            taille: "Taille : 1,89 m",
            poste: "Poste sur le terrain : Milieu",
            shirtnumber: "Numéro de  maillot : 2",
            but:"buts avec Fc Barcelone  : 15",
            assist:"buts assistés avec Fc Barcelone : 30",
            salaire: "Salaire annuel:  11,7 M euro",
            photo: "https://images.daznservices.com/di/library/GOAL/ae/bb/sergio-busquets-barcelona-2020-21_10x8nc95dxfdi15a23zmgxx1l8.jpg?t=-777556907&quality=60&w=1200&h=800"
        },
        {
            id: 12,
            name: "Miralem pjanic",
            description: "Stats de tout le temps sur Miralem pjanic ",
            nationalite: "Équipe Nationale : Bosnie-Herzégovine",
            age: "âge: 30 ans",
            taille: "Taille : 1,78 m",
            poste: "Poste sur le terrain : Milieu  ",
            shirtnumber: "Numéro de  maillot : 8",
            but:"buts avec Fc Barcelone  : 0",
            assist:"buts assistés avec Fc Barcelone : 0",
            salaire: "Salaire annuel:  9,7 M euro",
            photo: "https://static.onzemondial.com/photo_article/441822/167678/1200-L-bara-miralem-pjanic-demande-du-temps.jpg"
        },
        {
            id: 13,
            name: "Carles Alena",
            description: "Stats de tout le temps sur Carles Alena",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 22 ans",
            taille: "Taille : 1,80 m",
            poste: "Poste sur le terrain : Milieu  ",
            shirtnumber: "Numéro de  maillot : 6",
            but:"buts avec Fc Barcelone  : 3",
            assist:"buts assistés avec Fc Barcelone : 0",
            salaire: "Salaire annuel: 0,9 M euro",
            photo: "https://images.daznservices.com/di/library/GOAL/4d/23/carles-alena-barcelona-2020-21_3yoiap6tyk3d1c0dv6y2kzuap.jpg?t=32431542&quality=100"
        },
        {
            id: 14,
            name: "Riqui Puig",
            description: "Stats de tout le temps sur Riqui Puig",
            age: "âge: 21 ans",
            taille: "Taille : 1,69 m",
            nationalite: "Équipe Nationale : Espagne",
            poste: "Poste sur le terrain : Milieu  ",
            shirtnumber: "Numéro de  maillot : 12",
            but:"buts avec Fc Barcelone  : 0",
            assist:"buts assistés avec Fc Barcelone : 2",
            salaire: "Salaire annuel:  0,44 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/db30dca5-2a5c-44a4-9487-6adbc551754a/mini_1920x1080-riqui.png?width=670&height=790"
        },
        {
            id: 15,
            name: "Pedri González",
            description: "Stats de tout le temps sur Pedri González ",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 18 ans",
            taille: "Taille : 1,74 m",
            poste: "Poste sur le terrain :   Milieu",
            shirtnumber: "Numéro de  maillot : 16",
            but:"buts avec Fc Barcelone  : 2",
            assist:"buts assistés avec Fc Barcelone : 2",
            salaire: "Salaire annuel:  1,3 M euro",
            photo: "https://assets.laliga.com/squad/2020/t178/p490541/2048x2048/p490541_t178_2020_1_002_000.jpg"
        },
        {
            id: 16,
            name: "Frenkie De Jong",
            description: "Stats de tout le temps sur Frenkie De Jong",
            nationalite: "Équipe Nationale : Hollande",
            age: "âge:  23 ans",
            taille: "Taille : 1,8 m",
            poste: "Poste sur le terrain :  Milieu ",
            shirtnumber: "Numéro de  maillot : 21",
            but:"buts avec Fc Barcelone  : 2",
            assist:"buts assistés avec Fc Barcelone : 4",
            salaire: "Salaire annuel: 13 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/08/0bff0683-47ed-4361-8661-729ccf4275a6/mini_de-jong.png?width=670&height=790"
        },
        {
            id: 17,
            name: "Ousmane Dembélé",
            description: "Stats de tout le temps sur Ousmane Dembélé",
            nationalite: "Équipe Nationale : France",
            age: "âge: 23 ans",
            taille: "Taille : 1,78 m",
            poste: "Poste sur le terrain : Attaquant",
            shirtnumber: "Numéro de  maillot : 11",
            but:"buts avec Fc Barcelone  : 23",
            assist:"buts assistés avec Fc Barcelone : 17",
            salaire: "Salaire annuel: 12 M euro",
            photo: "https://icdn.juvefc.com/wp-content/uploads/2020/10/Ousmane-Dembele-1.jpg"
        },
        {
            id: 18,
            name: "Ansu Fati",
            description: "Stats de tout le temps sur Ansu Fati",
            nationalite: "Équipe Nationale : Espagne",
            age: "âge: 18 ans",
            taille: "Taille : 1,78 m",
            poste: "Poste sur le terrain :   Attaquant",
            shirtnumber: "Numéro de  maillot : 22",
            but:"buts avec Fc Barcelone  : 13",
            assist:"buts assistés avec Fc Barcelone : 3",
            salaire: "Salaire annuel: 1,6 M euro",
            photo: "https://assets.laliga.com/squad/2020/t178/p465607/2048x2048/p465607_t178_2020_1_003_000.png"
        },
        
        {
            id: 19,
            name: "Antoine Griezmann ",
            description: "Stats de tout le temps sur Antoine Griezmann",
            nationalite: "Équipe Nationale : France",
            age: "âge: 29 ans",
            taille: "Taille : 1,76 m",
            poste: "Poste sur le terrain : Défenceur Latéral Droit",
            shirtnumber: "Numéro de  maillot : 7",
            but:"buts avec Fc Barcelone  : 20",
            assist:"buts assistés avec Fc Barcelone : 6",
            salaire: "Salaire annuel: 23,3 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/08/2496225f-7f9c-4a7f-ad5c-820b806507c1/mini_GRIEZMANN.png?width=624&height=368"
        },
        
        {
            id: 20,
            name: "Martin Braithwaite",
            description: "Stats de tout le temps sur Martin Braithwaite",
            nationalite: "Équipe Nationale : Danemark",
            age: "âge: 29 ans",
            taille: "Taille : 1,87 m",
            poste: "Poste sur le terrain : Attaquant",
            shirtnumber: "Numéro de  maillot : 9",
            but:"buts avec Fc Barcelone  : 5",
            assist:"buts assistés avec Fc Barcelone : 1",
            salaire: "Salaire annuel:  1,4 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/1a0bece7-0763-4212-9311-bbd11e6ec478/mini_1920x1080-braithwaite.png?width=670&height=790"
        },
        
        {
            id: 21,
            name: "Philippe Coutinho",
            description: "Stats de tout le temps sur Philippe Coutinho",
            nationalite: "Équipe Nationale : Brésil",
            age: "âge: 28 ans",
            taille: "Taille : 1,72 m",
            poste: "Poste sur le terrain : Milieu",
            shirtnumber: "Numéro de  maillot : 14",
            but:"buts avec Fc Barcelone  : 24",
            assist:"buts assistés avec Fc Barcelone : 13",
            salaire: "Salaire annuel:  17,5 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/5fff7dbd-9963-4121-91de-eecf286c753f/mini_1920x1080-coutinho.png?width=670&height=790"
        },
        
        {
            id: 22,
            name: "Francisco Trincao",
            description: "Stats de tout le temps sur Francisco Trincao",
            nationalite: "Équipe Nationale : Portugal",
            age: "âge: 20 ans",
            taille: "Taille : 1,84 m",
            poste: "Poste sur le terrain :   Attaquant",
            shirtnumber: "Numéro de  maillot : 17",
            but:"buts avec Fc Barcelone  : 0",
            assist:"buts assistés avec Fc Barcelone : 1",
            salaire: "Salaire annuel:  1,2 M euro",
            photo: "https://www.fcbarcelona.com/photo-resources/2020/10/13/e268f7e7-6abf-4623-8bf6-da51433bcae3/mini_1920x1080-trincao.png?width=624&height=368"
        },
        {
            id: 23,
            name: "Messi",
            description: "Stats de tout le temps sur Messi ",
            nationalite: "Équipe Nationale : Argentine",
            age: "âge: 33 ans",
            taille: "Taille : 1,70 m",
            poste: "poste sur le terrain : Attaquant",
            shirtnumber: "Numéro de  maillot : 10",
            but: "buts avec Fc Barcelone : 641 ",
            assist:"buts assistés avec Fc Barcelone  : 278",
            salaire: "Salaire annuel: 51,9 M euro",
            photo: "https://icdn.football-espana.net/wp-content/uploads/2020/09/Messi2709.jpg"

        },
        {
            id: 24,
            name: "Ronald Koeman",
            description: "Actuel Coach et Ancien joueur du FC Barcelone ",
            nationalite: "Nationalité : Hollande",
            age: "âge: 57 ans",
            taille: "Taille : 1,81 m",
            poste: "position : Entraineur Chef",
            but: "buts avec Fc Barcelone : 90 ",
            salaire: "Salaire annuel: 5 M euro",
            assist:"",
            shirtnumber: " Numéro de  maillot : N/S",
            
            photo: "https://icdn.football-espana.net/wp-content/uploads/2020/08/ronald-koeman-epa20082020.jpg"

        },
    );

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
