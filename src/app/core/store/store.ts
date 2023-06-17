import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './reducers/router.reducer';

export interface CoreState {
  routerReducer?: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const CoreReducers: ActionReducerMap<CoreState> = {
  routerReducer: fromRouter.routerReducer,
};
