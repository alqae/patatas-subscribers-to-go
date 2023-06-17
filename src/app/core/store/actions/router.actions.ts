import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const UNSUSCRIBE = '[Core] Unsuscribe';
export const UNSUSCRIBED = '[Core] Unsuscribed';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class Unsuscribe implements Action {
  readonly type = UNSUSCRIBE;

  constructor(public payload: any) {}
}

export class Unsuscribed implements Action {
  readonly type = UNSUSCRIBED;

  constructor(public payload: any) {}
}

export type Actions
  = Go
  | Back
  | Forward
  | Unsuscribe
  | Unsuscribed;
