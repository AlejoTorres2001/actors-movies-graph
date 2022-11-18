import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Actor } from 'src/app/shared/models/actor.model';
import { ActorService } from 'src/app/shared/services/actors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private actorService: ActorService) {}
  actors: Actor[] = [];
  ngOnInit() {
    this.actorService
      .get()
      .pipe(take(1))
      .subscribe(actors => (this.actors = actors));
  }
}
