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
  GetSubscriptors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.GetSubscriptors),
      map((action: fromActions.GetSubscriptors) => action.payload),
      exhaustMap((payload) => {
        return this._service.GetSubscriptors(payload).pipe(
          map((response) => new fromActions.GetSubscriptorsSuccess(response)),
          catchError(error => of(new fromActions.GetSubscriptorsFailure(error)))
        )}
      )
    )
  });

  GetSubscriptorsFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.GetSubscriptorsFailure),
      map((action: fromActions.GetSubscriptorsFailure) => action.payload),
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

  GetSubscriptor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.GetSubscriptor),
      map((action: fromActions.GetSubscriptor) => action.payload),
      exhaustMap((payload) => {
        return this._service.GetSubscriptor(payload).pipe(
          map((response) => new fromActions.GetSubscriptorSuccess(response)),
          catchError(error => of(new fromActions.GetSubscriptorFailure(error)))
        )}
      )
    )
  });

  CreateSubscriptor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.CreateSubscriptor),
      map((action: fromActions.CreateSubscriptor) => action.payload),
      exhaustMap((payload) => {
        return this._service.CreateSubscriptor(payload).pipe(
          map((response) => new fromActions.CreateSubscriptorSuccess()),
          catchError(error => of(new fromActions.CreateSubscriptorFailure(error)))
        )}
      )
    )
  });

  CreateSubscriptorSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.CreateSubscriptorSuccess),
      tap(() => {
        this._snackBar.open('Subscriptor created successfully', 'Close', {
          duration: 2000,
        });
      })
    )
  }, { dispatch: false });

  UpdateSubscriptor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.UpdateSubscriptor),
      map((action: fromActions.UpdateSubscriptor) => action.payload),
      exhaustMap((payload) => {
        return this._service.UpdateSubscriptor(payload).pipe(
          map((response) => new fromActions.UpdateSubscriptorSuccess()),
          catchError(error => of(new fromActions.UpdateSubscriptorFailure(error)))
        )}
      )
    )
  });

  UpdateSubscriptorSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.UpdateSubscriptorSuccess),
      withLatestFrom(this._store.select(fromReducers.getSubscriptor)),
      tap(([_, subscriptor]) => {
        if (subscriptor) {
          this._store.dispatch(new fromActions.GetSubscriptor(subscriptor.Id));
        }
        this._snackBar.open('Subscriptor updated successfully', 'Close', {
          duration: 3000,
        });
      })
    )
  }, { dispatch: false });

  DeleteSubscriptor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.DeleteSubscriptor),
      map((action: fromActions.DeleteSubscriptor) => action.payload),
      withLatestFrom(this._store.select(fromReducers.getLastQuery)),
      tap(([payload, lastQuery]) => {
        this._utils.showDialog({
          width: '350px',
          data: {
            title: 'Confirm',
            message: 'Are you sure you want to delete this subscriptor?',
            onConfirm: () => {
              this._service.DeleteSubscriptor(payload).subscribe({
                next: (response) => {
                  this._store.dispatch(new fromActions.DeleteSubscriptorSuccess(response.message));
                  this._store.dispatch(new fromActions.GetSubscriptors(lastQuery ?? {}))
                },
                error: (error) => {
                  this._store.dispatch(new fromActions.DeleteSubscriptorFailure(error));
                }
              });
            }
          },
        })}
      )
    )
  }, { dispatch: false });

  DeleteSubscriptorSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.DeleteSubscriptorSuccess),
      map((action: fromActions.DeleteSubscriptorSuccess) => action.payload),
      tap((response) => {
        if (response) {
          this._snackBar.open(response, 'Close', { duration: 3000 });
        }
      })
    )
  }, { dispatch: false });

  DeleteSubscriptorFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SubscriberActionTypes.DeleteSubscriptorFailure),
      map((action: fromActions.DeleteSubscriptorFailure) => action.payload),
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
    private _service: fromServices.SubscriptorService,
    private _utils: fromServicesShared.UtilsService,
    private _snackBar: MatSnackBar,
  ) {}
}
