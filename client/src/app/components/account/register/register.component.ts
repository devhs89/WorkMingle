import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ToasterService} from "../../../services/toaster.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  protected registrationForm: FormGroup = new FormGroup({});
  private _subscriptions: Subscription[] = [];
  private _registerUserSubscription: Subscription | null = null;

  constructor(pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService, private router: Router, private snackBarService: ToasterService) {
    pageTitleService.setWindowTitle('Register');
    pageTitleService.setPageTitle('Register');
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['alice.smith@example.com', [Validators.required, Validators.email]],
      password: ['Xyz12345$', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/)]],
      firstName: ['Alice', Validators.required],
      lastName: ['Smith', Validators.required],
      country: ['Canada', Validators.required],
      state: ['Ontario'],
      city: ['Toronto'],
      postcode: ['M5V 2R9'],
      termsAndConditions: [false, Validators.requiredTrue]
    });
  }

  onWmRfSubmit() {
    if (this.registrationForm?.valid) {
      this._registerUserSubscription = this.accountService.registerUser(this.registrationForm.value).subscribe({
        next: (jsonData) => {
          if (jsonData.token) {
            this.router.navigate(['/']).then(() => this.snackBarService.openSnackbar({
              message: 'Registration successful',
              type: "success"
            }));
          } else {
            this.snackBarService.openSnackbar({
              message: 'Registration failed',
              type: "error"
            });
          }
        },
        error: (httpErrResp) =>
          this.snackBarService.openSnackbar({message: httpErrResp.error.message, type: "error"}),
      });
      this._subscriptions.push(this._registerUserSubscription);
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}