import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUserInterface} from "../interfaces/app-user.interface";
import {TokenPayloadInterface} from "../interfaces/token-payload.interface";
import {ReplaySubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  private _tokenPayloadReplaySubject = new ReplaySubject<TokenPayloadInterface | null>(1);
  tokenPayload$ = this._tokenPayloadReplaySubject.asObservable();

  constructor(private httpClient: HttpClient) {
    const tokenPayload = this._getLoginToken();
    if (tokenPayload) this._emitLogin(JSON.parse(tokenPayload) ?? null);
  }

  ngOnInit(): void {
  }

  registerUser(appUser: AppUserInterface) {
    return this.httpClient.post<TokenPayloadInterface>('/api/auth/register', appUser, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(tap((tokenPayload) => {
      this._saveLoginToken(tokenPayload);
      this._emitLogin(tokenPayload);
    }));
  }

  loginUser(credentials: { email: string, password: string }) {
    return this.httpClient.post<TokenPayloadInterface>('/api/auth/login', credentials, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(tap((tokenPayload) => {
      this._saveLoginToken(tokenPayload);
      this._emitLogin(tokenPayload);
    }));
  }

  getUserProfile() {
    return this.httpClient.post<AppUserInterface>('/api/auth/profile', {});
  }

  updateUser(appUser: AppUserInterface) {
    return this.httpClient.put<TokenPayloadInterface>('/api/auth/update', appUser, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  logoutUser() {
    this._removeLoginToken();
    this._emitLogout();
  }

  private _saveLoginToken = (tokenPayload: TokenPayloadInterface) => localStorage.setItem('tokenPayload', JSON.stringify(tokenPayload));

  private _getLoginToken = () => localStorage.getItem('tokenPayload');

  private _removeLoginToken = () => localStorage.removeItem('tokenPayload');

  private _emitLogin = (tokenPayload: TokenPayloadInterface) => this._tokenPayloadReplaySubject.next(tokenPayload);

  private _emitLogout = () => this._tokenPayloadReplaySubject.next(null);
}
