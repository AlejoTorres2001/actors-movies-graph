import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/shared/state/auth/auth.reducer';
import { isLoginPending } from 'src/app/shared/state/auth/auth.selectors';
import * as AuthActions from '../../../shared/state/auth/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage {
  form: FormGroup;

  isLoginPending$ = this.store.select(isLoginPending);
  constructor(
    private readonly store: Store<AuthState>,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    const formValue = this.form.value;
    const credentials = {
      email: formValue.email,
      password: formValue.password,
    };
    this.store.dispatch(AuthActions.loginRequest({ credentials }));
  }
  refresh() {}
  logout() {
    this.store.dispatch(AuthActions.logoutRequest());
  }
}
