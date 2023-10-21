import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageTitleService} from "../../../services/page-title.service";
import {AccountService} from "../../../services/account.service";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup<any>({});

  constructor(private pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService, private snackBarService: SnackBarService) {
    pageTitleService.setWindowTitle('Login');
    pageTitleService.setPageTitle('Login');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onWmLgSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.accountService.loginUser(this.loginForm.value)
        .subscribe({
          next: (resp) => console.log(resp),
          error: (err) => this.snackBarService.showSnackBar({message: err.message})
        });
    }
  }
}
