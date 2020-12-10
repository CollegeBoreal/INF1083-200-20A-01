import { Component } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Video } from '@nstudio/nativescript-exoplayer';
registerElement("Video", () => Video);  

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
