import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './home.routes';
import { IndexPage } from './pages/index/index.component';

@NgModule({
  declarations: [IndexPage],
  imports: [CommonModule, RoutingModule],
})
export class HomeModule {}
