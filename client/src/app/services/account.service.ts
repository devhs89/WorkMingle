import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUserInterface} from "../interfaces/app-user.interface";
import {AuthResponseInterface} from "../interfaces/auth-response.interface";
import {ReplaySubject, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  private _authResponseReplaySubject = new ReplaySubject<AuthResponseInterface | null>(1);
  authResponse$ = this._authResponseReplaySubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    const tokenPayload = this._getLoginToken();
    if (tokenPayload) this._emitLogin(tokenPayload);
  }

  ngOnInit(): void {
  }

  registerUser(appUser: AppUserInterface) {
    return this.httpClient.post<AuthResponseInterface>('/api/auth/register', appUser)
      .pipe(tap((tokenPayload) => {
        this._saveLoginToken(tokenPayload);
        this._emitLogin(tokenPayload);
      }));
  }

  loginUser(credentials: { email: string, password: string }) {
    return this.httpClient.post<AuthResponseInterface>('/api/auth/login', credentials)
      .pipe(tap((tokenPayload) => {
        this._saveLoginToken(tokenPayload);
        this._emitLogin(tokenPayload);
      }));
  }

  validateAuthToken(logoutOnInvalid: boolean = false) {
    return this.httpClient.post<{ valid: boolean }>('/api/auth/validate-auth-token', {})
      .pipe(tap((resp) => resp.valid && logoutOnInvalid && this.logoutUser()));
  }

  getUserProfile() {
    return this.httpClient.post<AppUserInterface>('/api/auth/profile', {});
  }

  updateUser(appUser: AppUserInterface) {
    return this.httpClient.put<AppUserInterface>('/api/auth/update-profile', appUser);
  }

  logoutUser(redirectToLogin: boolean = false) {
    this._removeLoginToken();
    this._emitLogout();
    return redirectToLogin ? this.router.navigate(['/login']) : this.router.navigate(['/']);
  }

  private _getLoginToken = () => JSON.parse(localStorage.getItem('tokenPayload') ?? 'null');

  private _saveLoginToken = (tokenPayload: AuthResponseInterface) => localStorage.setItem('tokenPayload', JSON.stringify(tokenPayload));

  private _removeLoginToken = () => localStorage.removeItem('tokenPayload');

  private _emitLogin = (tokenPayload: AuthResponseInterface) => this._authResponseReplaySubject.next(tokenPayload);

  private _emitLogout = () => this._authResponseReplaySubject.next(null);
}
