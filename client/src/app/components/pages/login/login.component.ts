import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {PageTitleService} from "../../../services/page-title.service";
<<<<<<< Updated upstream
import {AccountService} from "../../../services/account.service";
import {SnackBarService} from "../../../services/snack-bar.service";
=======
import { HttpClient } from '@angular/common/http';

>>>>>>> Stashed changes

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup<any>({});

<<<<<<< Updated upstream
  constructor(private titleService: Title, private pageTitleService: PageTitleService, private fb: FormBuilder, private accountService: AccountService, private snackBarService: SnackBarService) {
=======
  constructor(private titleService: Title, private pageTitleService: PageTitleService, private fb: FormBuilder, private http: HttpClient) {
>>>>>>> Stashed changes
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

      const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    // Send a POST request to the /login route on your Express server
    this.http.post('/login', { email, password }).subscribe(
      (response: any) => {
        // Handle the response from the server (e.g., save tokens, redirect)
        console.log(response);

        // Example: If login is successful and you receive a token, you can save it to localStorage
      //  if (response && response.token) {
      //    localStorage.setItem('token', response.token);
          // Redirect to a protected route or perform other actions
        }
    //  },
    //  (error: any) => {
        // Handle errors (e.g., display an error message)
      //  console.error(error);
      //}
    );
      console.log(this.loginForm.value);
      this.accountService.loginUser(this.loginForm.value)
        .subscribe({
          next: (resp) => console.log(resp),
          error: (err) => this.snackBarService.showSnackBar({message: err.message})
        });
    }
  }
}
