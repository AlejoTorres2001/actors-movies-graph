import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from 'src/models/actor.model';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient) {}

  get(): Observable<Actor[]> {
    return this.http.get<Actor[]>(environment.backendUrl + '/actors');
  }
}
