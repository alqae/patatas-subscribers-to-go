import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  setLanguage = '[Core] setLanguage',
}

export class setLanguage implements Action {
  readonly type = SharedActionTypes.setLanguage;

  constructor(public payload: string) {}
}

export type SharedActions =
  | setLanguage;
