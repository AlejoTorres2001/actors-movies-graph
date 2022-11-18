import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './auth.routes';
import { LoginPage } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
})
export class AuthModule {}
