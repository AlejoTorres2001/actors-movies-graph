import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({
  providedIn: 'root',
})
export class PrivateAPIHttpClient {
  constructor(private readonly client: HttpClient) {}
  Request<T>(
    method: HttpMethods,
    url: string,
    MoreHeaders?: HttpHeaders,
    body?: any
  ): Observable<T> {
    return this.client.request<T>(method, environment.backendUrl + url, {
      body,
      headers: {
        'Content-Type': 'application/json',
        ...MoreHeaders,
      },
      withCredentials: true,
    });
  }
}
