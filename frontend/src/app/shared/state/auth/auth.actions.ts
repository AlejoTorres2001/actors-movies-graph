import { createAction, props } from '@ngrx/store';
import { AuthLoginResponse } from '../../models/authLoginResponse';
import { LoginUser } from '../../models/loginUser.model';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: LoginUser }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginSuccessResponse: AuthLoginResponse }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const loginPending = createAction('[Auth] Login Pending');
