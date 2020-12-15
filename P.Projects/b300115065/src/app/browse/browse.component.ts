import { Component, OnInit } from "@angular/core";
// somewhere at top of your component or bootstrap file
import { registerElement } from "@nativescript/angular";
import { Video } from '@nstudio/nativescript-exoplayer';
registerElement("Video", () => Video);

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
