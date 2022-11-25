import { createAction, props } from '@ngrx/store';
import { AuthLoginResponse } from '../../models/authLoginResponse';
import { LoginUser } from '../../models/loginUser.model';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<LoginUser>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<AuthLoginResponse>()
);
export const loginFailed = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
