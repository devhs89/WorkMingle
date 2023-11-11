import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUserInterface} from "../interfaces/app-user.interface";
import {AuthResponseInterface} from "../interfaces/auth-response.interface";
import {ReplaySubject, tap} from "rxjs";
import {Router} from "@angular/router";
import {RedirectOptionsEnum} from "../constants/redirect-options.enum";
import {AppEmployerInterface} from "../interfaces/app-employer.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  private _authResponseReplaySubject = new ReplaySubject<AuthResponseInterface | null>(1);
  authResponse$ = this._authResponseReplaySubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    const authResp = this._getAuthToken();
    authResp ? this._emitAuthToken(authResp) : this._emitAuthToken(null);
  }

  ngOnInit(): void {
  }

  registerUser(appUser: AppUserInterface) {
    return this.httpClient.post<AuthResponseInterface>('/api/account/register', appUser)
      .pipe(tap((authResp) => this._createAuthSession(authResp)));
  }

  loginUser(credentials: { email: string, password: string }) {
    return this.httpClient.post<AuthResponseInterface>('/api/account/login', credentials)
      .pipe(tap((authResp) => this._createAuthSession(authResp)));
  }

  getUserProfile() {
    return this.httpClient.post<AppUserInterface>('/api/account/profile', {});
  }

  updateUser(appUser: AppUserInterface) {
    return this.httpClient.put<AppUserInterface>('/api/account/update-profile', appUser);
  }

  registerEmployer(appEmployer: AppEmployerInterface) {
    return this.httpClient.post<AuthResponseInterface>('/api/account/employer/register', appEmployer)
      .pipe(tap((authResp) => this._createAuthSession(authResp)));
  }

  logoutUser(to: RedirectOptionsEnum = RedirectOptionsEnum.NONE) {
    this._deleteAuthSession();
    if (to === RedirectOptionsEnum.LOGIN) return this.router.navigate(['/login']);
    if (to === RedirectOptionsEnum.HOME) return this.router.navigate(['/home']);
    return null;
  }

  private _getAuthToken = () => JSON.parse(localStorage.getItem('authToken') ?? 'null');

  private _saveAuthToken = (authToken: AuthResponseInterface) => localStorage.setItem('authToken', JSON.stringify(authToken));

  private _removeAuthToken = () => localStorage.removeItem('authToken');

  private _emitAuthToken = (authToken: AuthResponseInterface | null) => this._authResponseReplaySubject.next(authToken);

  private _emitLogout = () => this._authResponseReplaySubject.next(null);

  private _createAuthSession = (authResp: AuthResponseInterface) => {
    this._saveAuthToken(authResp);
    this._emitAuthToken(authResp);
  };

  private _deleteAuthSession = () => {
    this._removeAuthToken();
    this._emitLogout();
  };
}
