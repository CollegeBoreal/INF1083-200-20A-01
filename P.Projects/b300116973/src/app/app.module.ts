import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
<<<<<<< HEAD
import { NativeScriptModule, NativeScriptHttpClientModule } from "@nativescript/angular";
=======
import { NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";
>>>>>>> 81f378f0985a9ed9e5005122d426f062370ed3a2

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptModule,
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
