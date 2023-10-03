import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PageTitleService} from "../../../services/page-title.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup = new FormGroup({});

  constructor(private titleService: Title, private pageTitle: PageTitleService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Register');
    this.pageTitle.setTitle('Register');
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
      city: [''],
      postcode: [''],
      termsAndConditions: [false, Validators.requiredTrue]
    });
  }

  onWmRfSubmit() {
    if (this.registrationForm?.valid) {
      // Handle form submission here
      console.log(this.registrationForm.value);
    }
  }
}
