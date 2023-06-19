import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Observable ,  of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { tap, map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';

import * as fromServices from '@shared/services';
import * as fromActions from '../actions/shared.actions';

import * as fromStoreShared from '@shared/store';
import * as fromActionsShared from '@shared/store/actions/shared.actions';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SharedEffects {
  // errorAlert$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fromActions.SharedActionTypes.ErrorAlert),
  //     map((action: fromActions.ErrorAlert) => action.payload),
  //     tap((message) => {
  //       // CODE
  //     })
  //   )
  // }, { dispatch: false });

  setLanguage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SharedActionTypes.setLanguage),
      map((action: fromActions.setLanguage) => action.payload),
      tap((language) => this._translate.use(language))
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _utils: fromServices.UtilsService,
    private _translate: TranslateService,
    private _storeShared: Store<fromStoreShared.SharedState>
  ) { }
}
