import { CanActivateFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

import * as fromStoreLogin from '@login/store';
import * as fromStore from '../store';

export const userAuthenticathedGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<fromStoreLogin.LoginState>);
  return store.pipe(
    select(fromStoreLogin.getLoggedIn),
    map(loggedIn => {
      if (!loggedIn) {
        store.dispatch(new fromStore.Go({
          path: ['login']
        }));

        return false;
      }

      return true;
    }),
    take(1)
  );
};

export const userNotAuthenticathedGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<fromStoreLogin.LoginState>);

  return store.pipe(
    select(fromStoreLogin.getLoggedIn),
    map(loggedIn => {
      if (loggedIn) {
        store.dispatch(new fromStore.Go({
          path: ['subscribers']
        }));

        return false;
      }

      return true;
    }),
    take(1)
  );
}
