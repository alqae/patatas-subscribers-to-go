import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/shared.actions';

export function SharedReducer(state = fromStore.initialState, action: fromActions.SharedActions): fromStore.SharedState {
  switch (action.type) {
    case fromActions.SharedActionTypes.setLanguage: {
      return {
        ...state,
        language: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const exportLanguage = (state: fromStore.SharedState) => state.language;
const selectSharedState = createFeatureSelector<fromStore.SharedState>('shared');

export const getLanguage = createSelector(selectSharedState, exportLanguage);
