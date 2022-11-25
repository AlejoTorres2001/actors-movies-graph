import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrivateRequestInterceptor } from 'src/app/shared/interceptors/private-request.interceptor';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { authReducer } from './shared/state/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/state/auth/auth.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutingModule,

    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      auth: authReducer,
    }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PrivateRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
