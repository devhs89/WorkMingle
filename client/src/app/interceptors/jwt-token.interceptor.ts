import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {AccountService} from "../services/account.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clonedRequest = null;
    this.accountService.authResponse$.pipe(take(1)).subscribe({
      next: (authResp) => {
        if (authResp) {
          clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${authResp.token}`
            }
          });
        }
      }
    });
    return next.handle(clonedRequest ?? request);
  }
}
