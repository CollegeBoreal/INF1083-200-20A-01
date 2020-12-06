import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, View} from "@nativescript/core";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    animate(view: View) {
        let duration = 300;
        view.animate({ opacity: 0, duration: duration })
            .then(() => view.animate({ opacity: 1, duration: duration }))
            .then(() => view.animate({ translate: { x: 200, y: 200 }, duration: duration }))
            .then(() => view.animate({ translate: { x: 0, y: 0 }, duration: duration }))
            .then(() => view.animate({ scale: { x: 5, y: 5 }, duration: duration }))
            .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: duration }))
            .then(() => view.animate({ rotate: 180, duration: duration }))
            .then(() => view.animate({ rotate: 0, duration: duration }))
            .then(() => {
                console.log("Animation finished");
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
}
