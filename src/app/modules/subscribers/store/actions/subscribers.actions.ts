import { Action } from '@ngrx/store';

import * as fromModels from '@app/models';
import { HttpErrorResponse } from '@angular/common/http';

export enum SubscriberActionTypes {
  GetSubscribers = '[Subscribers] GetSubscribers',
  GetSubscribersSuccess = '[Subscribers] GetSubscribersSuccess',
  GetSubscribersFailure = '[Subscribers] GetSubscribersFailure',
  GetSubscriber = '[Subscribers] GetSubscriber',
  GetSubscriberSuccess = '[Subscribers] GetSubscriberSuccess',
  GetSubscriberFailure = '[Subscribers] GetSubscriberFailure',
  ClearSubscriber = '[Subscribers] ClearSubscriber',
  CreateSubscriber = '[Subscribers] CreateSubscriber',
  CreateSubscriberSuccess = '[Subscribers] CreateSubscriberSuccess',
  CreateSubscriberFailure = '[Subscribers] CreateSubscriberFailure',
  UpdateSubscriber = '[Subscribers] UpdateSubscriber',
  UpdateSubscriberSuccess = '[Subscribers] UpdateSubscriberSuccess',
  UpdateSubscriberFailure = '[Subscribers] UpdateSubscriberFailure',
  DeleteSubscriber = '[Subscribers] DeleteSubscriber',
  DeleteSubscriberSuccess = '[Subscribers] DeleteSubscriberSuccess',
  DeleteSubscriberFailure = '[Subscribers] DeleteSubscriberFailure',
}

export class GetSubscribers implements Action {
  readonly type = SubscriberActionTypes.GetSubscribers;

  constructor(public payload: fromModels.Filter) {}
}

export class GetSubscribersSuccess implements Action {
  readonly type = SubscriberActionTypes.GetSubscribersSuccess;

  constructor(public payload: fromModels.IResponse<fromModels.Subscriber[]>) {}
}

export class GetSubscribersFailure implements Action {
  readonly type = SubscriberActionTypes.GetSubscribersFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetSubscriber implements Action {
  readonly type = SubscriberActionTypes.GetSubscriber;

  constructor(public payload: number) {}
}

export class GetSubscriberSuccess implements Action {
  readonly type = SubscriberActionTypes.GetSubscriberSuccess;

  constructor(public payload: fromModels.Subscriber) {}
}

export class GetSubscriberFailure implements Action {
  readonly type = SubscriberActionTypes.GetSubscriberFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export class ClearSubscriber implements Action {
  readonly type = SubscriberActionTypes.ClearSubscriber;
}

// export class CreateSubscriber implements Action {
//   readonly type = SubscriberActionTypes.CreateSubscriber;

//   constructor(public payload: any) {}
// }

// export class CreateSubscriberSuccess implements Action {
//   readonly type = SubscriberActionTypes.CreateSubscriberSuccess;

//   constructor(public payload: any) {}
// }

// export class CreateSubscriberFailure implements Action {
//   readonly type = SubscriberActionTypes.CreateSubscriberFailure;

//   constructor(public payload: any) {}
// }

export class UpdateSubscriber implements Action {
  readonly type = SubscriberActionTypes.UpdateSubscriber;

  constructor(public payload: Partial<fromModels.Subscriber>) {}
}

export class UpdateSubscriberSuccess implements Action {
  readonly type = SubscriberActionTypes.UpdateSubscriberSuccess;
}

export class UpdateSubscriberFailure implements Action {
  readonly type = SubscriberActionTypes.UpdateSubscriberFailure;

  constructor(public payload: any) {}
}

export class DeleteSubscriber implements Action {
  readonly type = SubscriberActionTypes.DeleteSubscriber;

  constructor(public payload: number) {}
}

export class DeleteSubscriberSuccess implements Action {
  readonly type = SubscriberActionTypes.DeleteSubscriberSuccess;

  constructor(public payload?: string) {}
}

export class DeleteSubscriberFailure implements Action {
  readonly type = SubscriberActionTypes.DeleteSubscriberFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export type SubscribersActions =
  | GetSubscribers
  | GetSubscribersSuccess
  | GetSubscribersFailure
  | UpdateSubscriber
  | UpdateSubscriberSuccess
  | UpdateSubscriberFailure
  | DeleteSubscriber
  | DeleteSubscriberSuccess
  | DeleteSubscriberFailure
  | GetSubscriber
  | GetSubscriberSuccess
  | GetSubscriberFailure
  | ClearSubscriber;
