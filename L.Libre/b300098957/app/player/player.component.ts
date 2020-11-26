import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import { TabView } from "ui/tab-view";
import { Page } from 'ui/page';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData, RadListView, ListViewLoadOnDemandMode } from "nativescript-ui-listview";
import { GridLayout } from "ui/layouts/grid-layout";
@Component({
    selector: "player",
    moduleId: module.id,
    templateUrl: "./player.component.html",
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    @ViewChild('bg') gridlayout: ElementRef;

    constructor(private router: RouterExtensions, private page: Page) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }
    ngAfterViewInit() {
    }

    goBack() {
        this.router.back();
    }
}

















