import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActorService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'movies-and-actors';
  actors: {
    id: string;
    name: string;
    birthYear: number;
  }[] = [];
  constructor(private actorService: ActorService) {}

  ngOnInit() {
    this.actorService
      .get()
      .pipe(take(1))
      .subscribe(actors => (this.actors = actors));
  }
}
