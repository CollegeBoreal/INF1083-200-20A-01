import { Component, OnInit } from "@angular/core";

import { Page } from "@nativescript/core/ui/page";
import { View } from "@nativescript/core/ui/core/view";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    constructor(private page: Page) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
    }

    onAnimateLinear(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.linear
        });
    }
    
    onAnimateEaseIn(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeIn
        });}
    
    onAnimateEaseOut(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeOut
        });
    }
    
    onAnimateEaseInEaseOut(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.easeInOut
        });
    }
    
    onAnimateSpring(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.spring
        });
    }
    
    onAnimateCustom(view: View): void {
        view.animate({
            translate: { x: 0, y: 100},
            duration: 1000,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }
    
    onReset(view: View): void {
        view.translateX = 0;
        view.translateY = 0;
    }
}