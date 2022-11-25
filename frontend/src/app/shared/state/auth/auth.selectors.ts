import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAccessToken = createSelector(
  selectAuthState,
  state => state.access_token
);
export const selectUser = createSelector(
  selectAuthState,
  state => state.loggedInUser
);
export const isLoginPending = createSelector(
  selectAuthState,
  state => state.loginPending
);
export const isLoginError = createSelector(
  selectAuthState,
  state => state.loginError
);
