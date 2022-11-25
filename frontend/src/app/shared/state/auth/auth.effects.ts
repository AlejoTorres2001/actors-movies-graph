import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthService,
    private readonly router: Router
  ) {}
  loginRequest$ = createEffect(() => {
    AuthActions.loginPending();
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap(action =>
        this._authService
          .signin(action.credentials.email, action.credentials.password)
          .pipe(
            map(loginSuccessResponse =>
              AuthActions.loginSuccess({ loginSuccessResponse })
            ),
            catchError(error => of(AuthActions.loginFailure({ error })))
          )
      )
    );
  });
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
