import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUserInterface} from "../interfaces/app-user.interface";
import {of} from "rxjs";
import {TokenPayloadInterface} from "../interfaces/token-payload.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }

  registerUser(appUser: AppUserInterface) {
    return this.httpClient.post<TokenPayloadInterface>('/api/auth/register', appUser, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  loginUser(credentials: { email: string, password: string }) {
    return this.httpClient.post('/api/auth/login', credentials, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  saveLoginToken(token: string) {
    try {
      localStorage.setItem('loginToken', token);
      return of(true);
    } catch (e) {
      return of(false);
    }
  }
}
