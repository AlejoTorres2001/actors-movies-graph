import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

import { PrivateAPIHttpClient, PublicAPIHttpClient } from 'src/shared/api';

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
  signin(email: string, password: string) {
    return this.publicHttpClient
      .Request('POST', '/auth/local/signin', {} as HttpHeaders, {
        email,
        password,
      })
      .pipe(shareReplay());
  }
  refresh() {
    return this.privateHttpClient
      .Request('POST', '/auth/refresh')
      .pipe(shareReplay());
  }
  logout() {
    return this.privateHttpClient
      .Request('POST', '/auth/logut')
      .pipe(shareReplay());
  }
}
