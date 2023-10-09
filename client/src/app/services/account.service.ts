import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUser} from "../interfaces/app-user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }

  registerUser(appUser: AppUser) {
    return this.httpClient.post('/api/auth/register', appUser, {
      responseType: "text",
      headers: {'Content-Type': 'application/json'}
    });
  }

  loginUser(credentials: { email: string, password: string }) {
    return this.httpClient.post('/api/auth/login', credentials, {
      responseType: "text",
      headers: {'Content-Type': 'application/json'}
    });
  }
}
