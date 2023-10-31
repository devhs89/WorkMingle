import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {AccountService} from "../services/account.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  private _tokenPayloadSubscription: Subscription | null = null;
  private _subscriptions: Subscription[] = [];

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clonedRequest = null;
    this._tokenPayloadSubscription = this.accountService.tokenPayload$.subscribe({
      next: (tokenPayload) => {
        if (tokenPayload) {
          clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenPayload.token}`
            }
          });
        }
      }
    });
    return next.handle(clonedRequest ?? request);
  }
}
