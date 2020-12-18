import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
<<<<<<< HEAD
import { NativeScriptModule, NativeScriptHttpClientModule } from "@nativescript/angular";
=======
import { NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";
>>>>>>> 4e5c6d94b2f5f5e95add27e0076f78385076020f

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
