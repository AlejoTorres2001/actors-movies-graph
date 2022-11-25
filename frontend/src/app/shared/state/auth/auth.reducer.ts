import { createReducer, on } from '@ngrx/store';
import { LoggedInUser } from '../../models/loggedInUser.model';
import { loginFailure, loginPending, loginSuccess } from './auth.actions';

export interface AuthState {
  loggedInUser?: LoggedInUser;
  access_token?: string;
  loginError?: string;
  loginPending?: boolean;
}

export const initialState: AuthState = {
  loggedInUser: undefined,
  access_token: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(
    loginSuccess,
    (state, { loginSuccessResponse: { access_token, ...loggedInUser } }) => {
      return {
        ...state,
        loginPending: false,
        access_token: access_token,
        loggedInUser: loggedInUser,
      };
    }
  ),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      loginPending: false,
      access_token: undefined,
      loggedInUser: undefined,
    };
  }),
  on(loginPending, state => {
    return {
      ...state,
      loginPending: true,
    };
  })
);
