import { Component, OnInit } from "@angular/core";

import { Page } from "@nativescript/core/ui/page";
import { View } from "@nativescript/core/ui/core/view";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    view: View;

    constructor(private page: Page) {
        // Use the component constructor to inject providers.
        // Init your component properties here.
        this.view = page.getViewById<View>("view");
    }

    ngOnInit(): void {
    }

    onAnimateLinear(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.linear
        });
    }
    
    onAnimateEaseIn(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeIn
        });}
    
    onAnimateEaseOut(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeOut
        });
    }
    
    onAnimateEaseInEaseOut(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeInOut
        });
    }
    
    onAnimateSpring(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.spring
        });
    }
    
    onAnimateCustom(): void {
        this.view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }
    
    onReset(): void {
        this.view.translateX = 0;
        this.view.translateY = 0;
    }
}
