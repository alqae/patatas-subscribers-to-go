import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import * as fromServicesShared from '@shared/services';
import * as fromStoreCore from '@core/store/store';
import * as fromActionsCore from '@app/core/store/actions/router.actions';
import * as fromActions from '../actions/login.actions';
import * as fromServices from '@login/services';
import * as fromModels from '@app/models/user';
import * as fromStore from '../store';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.Login),
      map((action: fromActions.Login) => action.payload),
      exhaustMap((auth: fromModels.Authenticate) =>
        this._service.login(auth).pipe(
          map(response => new fromActions.LoginSuccess(response)),
          catchError(error => of(new fromActions.LoginFailure(error)))
        )
      )
    )
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.LoginSuccess),
      map((action: fromActions.LoginSuccess) => action.payload),
      tap((response) => {
        this._store.dispatch(new fromActions.SetToken(response.Token));
        this._storeCore.dispatch(new fromActionsCore.Go({
          path: ['subscribers']
        }));
      })
    )
  }, { dispatch: false });

  loginFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.LoginFailure),
      map((action: fromActions.LoginFailure) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response.error.error,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.Logout),
      tap(authed => {
        this._storeCore.dispatch(new fromActionsCore.Go({
          path: ['']
        }));
      })
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _service: fromServices.LoginService,
    private _utils: fromServicesShared.UtilsService,
    private _store: Store<fromStore.LoginState>,
    private _storeCore: Store<fromStoreCore.CoreState>,
  ) {}
}
