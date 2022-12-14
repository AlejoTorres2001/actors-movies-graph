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
export const logoutRequest = createAction('[Auth] Logout Request');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);

export const refreshTokenRequest = createAction('[Auth] Refresh Token Request');
export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ accessToken: string }>()
);
export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);
