import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { PrivateAPIHttpClient, PublicAPIHttpClient } from 'src/app/shared/api';
import { AuthLoginResponse } from 'src/app/shared/models/authLoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly privateHttpClient: PrivateAPIHttpClient,
    private readonly publicHttpClient: PublicAPIHttpClient
  ) {}
  signup(email: string, username: string, password: string) {
    return this.publicHttpClient
      .Request('POST', '/auth/local/signup', {} as HttpHeaders, {
        email,
        username,
        password,
      })
      .pipe(shareReplay());
  }
  signin(email: string, password: string): Observable<AuthLoginResponse> {
    return this.publicHttpClient.Request(
      'POST',
      '/auth/local/signin',
      {} as HttpHeaders,
      {
        email,
        password,
      }
    );
  }
  refresh(): Observable<{ access_token: string }> {
    return this.privateHttpClient.Request('POST', '/auth/refresh');
  }
  logout() {
    return this.privateHttpClient.Request('POST', '/auth/logout');
  }
}
