import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

import * as RouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouterActions.GO),
      map((action: RouterActions.Go) => action.payload),
      tap(({ path, query: queryParams, extras}) => {
        this.router.navigate(path, { queryParams, ...extras });
      })
    )
  }, { dispatch: false });

  navigateForward$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouterActions.FORWARD),
      map((action: RouterActions.Forward) => action),
      tap(() => this.location.forward())
    )
  }, { dispatch: false });

  navigateBack$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RouterActions.BACK),
    map((action: RouterActions.Back) => action),
    tap(() => this.location.forward())
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) { }
}
