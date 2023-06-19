import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import * as fromModels from '@app/models';

export enum ActionTypes {
  Login = '[Login] Login',
  Logout = '[Login] Logout',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
  SetToken = '[Login] Get Token',
}

export class Login implements Action {
  readonly type = ActionTypes.Login;

  constructor(public payload: fromModels.Authenticate) {}
}

export class SetToken implements Action {
  readonly type = ActionTypes.SetToken;

  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;

  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.LoginFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export type LoginActions =
  | Login
  | LoginSuccess
  | SetToken
  | LoginFailure
  | Logout;
