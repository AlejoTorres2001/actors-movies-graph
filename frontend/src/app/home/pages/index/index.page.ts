import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/shared/models/actor.model';
import { ActorService } from 'src/app/shared/services/actors.service';

@Component({
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.css'],
  selector: 'app-index',
})
export class IndexPage implements OnInit {
  actors = [] as Actor[];
  constructor(private readonly actorService: ActorService) {}

  ngOnInit() {
    this.actorService.get().subscribe(actors => {
      this.actors = actors;
    });
  }
}
