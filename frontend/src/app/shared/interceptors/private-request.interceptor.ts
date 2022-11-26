import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth/auth.reducer';
import { selectAccessToken } from '../state/auth/auth.selectors';

@Injectable()
export class PrivateRequestInterceptor implements HttpInterceptor {
  accessToken$ = this.store.select(selectAccessToken);
  accessToken?: string;
  constructor(private readonly store: Store<AuthState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl = req.url;
    if (requestUrl.includes('/signin') || requestUrl.includes('/signup')) {
      return next.handle(req);
    }
    this.accessToken$.subscribe(token => {
      console.log(token);
      this.accessToken = token;
    });
    const modifiedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.accessToken}`),
    });
    return next.handle(modifiedRequest);
  }
}
