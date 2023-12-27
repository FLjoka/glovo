import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  apiKey = environment.apiKey;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and set the new header in one step.
    const authReq = req.clone({
      headers: req.headers.set('X-API-KEY', this.apiKey),
    });

    // send the newly created request
    return next.handle(authReq);
  }
}
