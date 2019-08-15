import { Action } from '@ngrx/store';
import { User } from './user.model';

export const LOGIN = '[AUTH] Login';
export const LOGOUT = '[AUTH] Logout';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
