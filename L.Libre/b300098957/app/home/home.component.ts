import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from "ui/page";
import { screen } from "platform";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public viewHeigth: number = 0;

    constructor(private router: RouterExtensions, private page: Page) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.viewHeigth = screen.mainScreen.heightDIPs * 0.6;
        // console.log(this.viewHeigth);
    }

    goToArtist() {
        this.router.navigate(["artist"]);
    }

    goToPlayer() {
        this.router.navigate(["player"]);
    }

}

















