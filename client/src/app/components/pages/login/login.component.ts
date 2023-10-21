import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
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

  constructor(private titleService: Title, private pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.pageTitleService.setTitle('Login');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onWmLgSubmit(): void {
    if (this.loginForm.valid) {
      // Perform login logic here
      // Example: Send a login request to the server
      console.log(this.loginForm.value);
      this.accountService.loginUser(this.loginForm.value)
        .subscribe({
          next: (resp) => console.log(resp),
          error: (err) => this.snackBarService.showSnackBar({message: err.message})
        });
    }
  }
}
