import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PrivateRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl = req.url;
    if (requestUrl.includes('/signin') || requestUrl.includes('/signup')) {
      return next.handle(req);
    }
    const userToken = '123';
    const modifiedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedRequest);
  }
}
