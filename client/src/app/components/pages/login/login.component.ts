import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {PageTitleService} from "../../../services/page-title.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup<any>({});

  constructor(private titleService: Title, private pageTitleService: PageTitleService, private fb: FormBuilder) {
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
    }
  }
}
