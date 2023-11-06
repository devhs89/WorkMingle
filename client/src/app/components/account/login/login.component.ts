import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageTitleService} from "../../../services/page-title.service";
import {AccountService} from "../../../services/account.service";
import {ToasterService} from "../../../services/toaster.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup<any>({});
  private _subscriptions: Subscription[] = [];
  private _loginSubscription: Subscription | null = null;

  constructor(pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService, private snackBarService: ToasterService, private router: Router) {
    pageTitleService.setWindowTitle('Login');
    pageTitleService.setPageTitle('Login');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['alice.smith@example.com', [Validators.required, Validators.email]],
      password: ['Xyz12345$', [Validators.required]]
    });
  }

  onWmLgSubmit(): void {
    if (this.loginForm.valid) {
      this._loginSubscription = this.accountService.loginUser(this.loginForm.value).subscribe({
        next: (resp) => {
          if (resp.token) {
            this.router.navigate(['/']).then(() => this.snackBarService.openSnackbar({
              message: `Welcome ${resp.user.firstName}!`,
              type: "success"
            }));
          }
        },
        error: (err) => this.snackBarService.openSnackbar({message: err.error.message, type: "error"})
      });
      this._subscriptions.push(this._loginSubscription);
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
