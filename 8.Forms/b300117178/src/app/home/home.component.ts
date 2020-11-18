import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["Enter an email", Validators.required],
            username: ["Enter an Username", Validators.required],
        });
    }

    onButtonTap() {
        console.log("Boris King");
        console.log(JSON.stringify(this.signUpForm.value));
       
    }
}
