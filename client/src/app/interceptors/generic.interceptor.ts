import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class GenericInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isContentTypeSet = request.headers.has('Content-Type');
    if (!isContentTypeSet) {
      const clonedRequest = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
      return next.handle(clonedRequest);
    }

    if (request.headers.get('Content-Type') === 'multipart/form-data') {
      const clonedRequest = request.clone({headers: request.headers.delete('Content-Type')});
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
