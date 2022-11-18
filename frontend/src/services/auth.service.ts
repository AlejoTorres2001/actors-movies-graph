import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/models/loginUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  login(email: string, password: string) {
    return this.http
      .post<LoginUser>(environment.backendUrl + '/auth/local/signin', {
        email,
        password,
      })
      .pipe(shareReplay());
  }
  refresh() {
    return this.http
      .post(
        environment.backendUrl + '/auth/refresh',
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(shareReplay());
  }
}
