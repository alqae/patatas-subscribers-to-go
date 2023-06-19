import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import * as fromActions from '../actions/subscribers.actions';
import * as fromReducers from '../reducers/subscribers.reducer';
import * as fromServicesShared from '@shared/services';
import * as fromServices from '../../services';
import * as fromStore from '../store';

@Injectable()
export class SubscribersEffects {
  getSubscribers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.GetSubscribers),
      map((action: fromActions.GetSubscribers) => action.payload),
      exhaustMap((payload) => {
        return this._service.getSubscribers(payload).pipe(
          map((response) => new fromActions.GetSubscribersSuccess(response)),
          catchError(error => of(new fromActions.GetSubscribersFailure(error)))
        )}
      )
    )
  });

  getSubscribersFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.GetSubscribersFailure),
      map((action: fromActions.GetSubscribersFailure) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  getSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.GetSubscriber),
      map((action: fromActions.GetSubscriber) => action.payload),
      exhaustMap((payload) => {
        return this._service.getSubscriber(payload).pipe(
          map((response) => new fromActions.GetSubscriberSuccess(response)),
          catchError(error => of(new fromActions.GetSubscriberFailure(error)))
        )}
      )
    )
  });

  createSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.CreateSubscriber),
      map((action: fromActions.CreateSubscriber) => action.payload),
      exhaustMap((payload) => {
        return this._service.createSubscriber(payload).pipe(
          map((response) => new fromActions.CreateSubscriberSuccess()),
          catchError(error => of(new fromActions.CreateSubscriberFailure(error)))
        )}
      )
    )
  });

  createSubscriberSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.CreateSubscriberSuccess),
      tap(() => {
        this._snackBar.open('Subscriber created successfully', 'Close', {
          duration: 2000,
        });
      })
    )
  }, { dispatch: false });

  updateSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.UpdateSubscriber),
      map((action: fromActions.UpdateSubscriber) => action.payload),
      exhaustMap((payload) => {
        return this._service.updateSubscriber(payload).pipe(
          map((response) => new fromActions.UpdateSubscriberSuccess()),
          catchError(error => of(new fromActions.UpdateSubscriberFailure(error)))
        )}
      )
    )
  });

  updateSubscriberSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.UpdateSubscriberSuccess),
      withLatestFrom(this._store.select(fromReducers.getSubscriber)),
      tap(([_, subscriber]) => {
        if (subscriber) {
          this._store.dispatch(new fromActions.GetSubscriber(subscriber.Id));
        }
        this._snackBar.open('Subscriber updated successfully', 'Close', {
          duration: 3000,
        });
      })
    )
  }, { dispatch: false });

  deleteSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.DeleteSubscriber),
      map((action: fromActions.DeleteSubscriber) => action.payload),
      withLatestFrom(this._store.select(fromReducers.getLastQuery)),
      tap(([payload, lastQuery]) => {
        this._utils.showDialog({
          width: '350px',
          data: {
            title: 'Confirm',
            message: 'Are you sure you want to delete this subscriber?',
            onConfirm: () => {
              this._service.deleteSubscriber(payload).subscribe({
                next: (response) => {
                  this._store.dispatch(new fromActions.DeleteSubscriberSuccess(response.message));
                  this._store.dispatch(new fromActions.GetSubscribers(lastQuery ?? {}))
                },
                error: (error) => {
                  this._store.dispatch(new fromActions.DeleteSubscriberFailure(error));
                }
              });
            }
          },
        })}
      )
    )
  }, { dispatch: false });

  deleteSubscriberSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.DeleteSubscriberSuccess),
      map((action: fromActions.DeleteSubscriberSuccess) => action.payload),
      tap((response) => {
        if (response) {
          this._snackBar.open(response, 'Close', { duration: 3000 });
        }
      })
    )
  }, { dispatch: false });

  deleteSubscriberFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.DeleteSubscriberFailure),
      map((action: fromActions.DeleteSubscriberFailure) => action.payload),
      tap((response) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response.error.error,
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _store: Store<fromStore.SubscribersState>,
    private _service: fromServices.SubscriberService,
    private _utils: fromServicesShared.UtilsService,
    private _snackBar: MatSnackBar,
  ) {}
}
