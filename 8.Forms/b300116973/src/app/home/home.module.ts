import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

import { NativeScriptFormsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
