import { Action } from '@ngrx/store';

import * as fromModels from '@app/models';
import { HttpErrorResponse } from '@angular/common/http';

export enum SubscriberActionTypes {
  GetSubscriptors = '[Subscribers] GetSubscriptors',
  GetSubscriptorsSuccess = '[Subscribers] GetSubscriptorsSuccess',
  GetSubscriptorsFailure = '[Subscribers] GetSubscriptorsFailure',
  GetSubscriptor = '[Subscribers] GetSubscriptor',
  GetSubscriptorSuccess = '[Subscribers] GetSubscriptorSuccess',
  GetSubscriptorFailure = '[Subscribers] GetSubscriptorFailure',
  ClearSubscriptor = '[Subscribers] ClearSubscriptor',
  CreateSubscriptor = '[Subscribers] CreateSubscriptor',
  CreateSubscriptorSuccess = '[Subscribers] CreateSubscriptorSuccess',
  CreateSubscriptorFailure = '[Subscribers] CreateSubscriptorFailure',
  UpdateSubscriptor = '[Subscribers] UpdateSubscriptor',
  UpdateSubscriptorSuccess = '[Subscribers] UpdateSubscriptorSuccess',
  UpdateSubscriptorFailure = '[Subscribers] UpdateSubscriptorFailure',
  DeleteSubscriptor = '[Subscribers] DeleteSubscriptor',
  DeleteSubscriptorSuccess = '[Subscribers] DeleteSubscriptorSuccess',
  DeleteSubscriptorFailure = '[Subscribers] DeleteSubscriptorFailure',
}

export class GetSubscriptors implements Action {
  readonly type = SubscriberActionTypes.GetSubscriptors;

  constructor(public payload: fromModels.Filter) {}
}

export class GetSubscriptorsSuccess implements Action {
  readonly type = SubscriberActionTypes.GetSubscriptorsSuccess;

  constructor(public payload: fromModels.IResponse<fromModels.Subscriptor[]>) {}
}

export class GetSubscriptorsFailure implements Action {
  readonly type = SubscriberActionTypes.GetSubscriptorsFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetSubscriptor implements Action {
  readonly type = SubscriberActionTypes.GetSubscriptor;

  constructor(public payload: number) {}
}

export class GetSubscriptorSuccess implements Action {
  readonly type = SubscriberActionTypes.GetSubscriptorSuccess;

  constructor(public payload: fromModels.Subscriptor) {}
}

export class GetSubscriptorFailure implements Action {
  readonly type = SubscriberActionTypes.GetSubscriptorFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export class ClearSubscriptor implements Action {
  readonly type = SubscriberActionTypes.ClearSubscriptor;
}

export class CreateSubscriptor implements Action {
  readonly type = SubscriberActionTypes.CreateSubscriptor;

  constructor(public payload: { Subscribers: fromModels.Subscriptor[] }) {}
}

export class CreateSubscriptorSuccess implements Action {
  readonly type = SubscriberActionTypes.CreateSubscriptorSuccess;
}

export class CreateSubscriptorFailure implements Action {
  readonly type = SubscriberActionTypes.CreateSubscriptorFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateSubscriptor implements Action {
  readonly type = SubscriberActionTypes.UpdateSubscriptor;

  constructor(public payload: Partial<fromModels.Subscriptor>) {}
}

export class UpdateSubscriptorSuccess implements Action {
  readonly type = SubscriberActionTypes.UpdateSubscriptorSuccess;
}

export class UpdateSubscriptorFailure implements Action {
  readonly type = SubscriberActionTypes.UpdateSubscriptorFailure;

  constructor(public payload: any) {}
}

export class DeleteSubscriptor implements Action {
  readonly type = SubscriberActionTypes.DeleteSubscriptor;

  constructor(public payload: number) {}
}

export class DeleteSubscriptorSuccess implements Action {
  readonly type = SubscriberActionTypes.DeleteSubscriptorSuccess;

  constructor(public payload?: string) {}
}

export class DeleteSubscriptorFailure implements Action {
  readonly type = SubscriberActionTypes.DeleteSubscriptorFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export type SubscribersActions =
  | GetSubscriptor
  | GetSubscriptorSuccess
  | GetSubscriptorFailure
  | ClearSubscriptor
  | GetSubscriptors
  | GetSubscriptorsSuccess
  | GetSubscriptorsFailure
  | UpdateSubscriptor
  | UpdateSubscriptorSuccess
  | UpdateSubscriptorFailure
  | DeleteSubscriptor
  | DeleteSubscriptorSuccess
  | DeleteSubscriptorFailure;
