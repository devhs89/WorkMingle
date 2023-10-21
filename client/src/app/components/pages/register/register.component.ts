import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup = new FormGroup({});

  constructor(private pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService) {
    pageTitleService.setWindowTitle('Register');
    pageTitleService.setPageTitle('Register');
  }

  ngOnInit(): void {
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
      console.log(this.registrationForm.value);
      this.accountService.registerUser(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log(response);
        }
      });
    }
  }
}
