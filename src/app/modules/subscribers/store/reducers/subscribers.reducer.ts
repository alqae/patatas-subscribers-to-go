import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/subscribers.actions';

export function SubscribersReducer(state = fromStore.initialState, action: fromActions.SubscribersActions): fromStore.SubscribersState {
    switch (action.type) {
      case fromActions.SubscriberActionTypes.GetSubscriptors:
      return {
        ...state,
        isLoading: true,
        lastQuery: action.payload,
      }

      case fromActions.SubscriberActionTypes.GetSubscriptor:
        return {
          ...state,
          isLoading: true,
        };
      
      case fromActions.SubscriberActionTypes.GetSubscriptorsSuccess:
        return {
          ...state,
          subscribers: action.payload.Data,
          totalSubscribers: action.payload.Count,
          isLoading: false,
        };

      case fromActions.SubscriberActionTypes.GetSubscriptorSuccess:
        return {
          ...state,
          subscriptor: action.payload,
          isLoading: false,
        };

      case fromActions.SubscriberActionTypes.ClearSubscriptor:
        return {
          ...state,
          subscriptor: null,
          isLoading: false,
        };
        
      case fromActions.SubscriberActionTypes.GetSubscriptorsFailure:
      case fromActions.SubscriberActionTypes.GetSubscriptorFailure:
      case fromActions.SubscriberActionTypes.DeleteSubscriptorSuccess:
      case fromActions.SubscriberActionTypes.DeleteSubscriptorFailure:
        return {
          ...state,
          isLoading: false,
        };

      default: {
        return state;
      }
  }
}

const exportLoading = (state: fromStore.SubscribersState) => state.isLoading;
const exportSubscribers = (state: fromStore.SubscribersState) => state.subscribers;
const exportSubscriber = (state: fromStore.SubscribersState) => state.subscriptor;
const exportTotalSubscribers = (state: fromStore.SubscribersState) => state.totalSubscribers;
const exportLastQuery = (state: fromStore.SubscribersState) => state.lastQuery;
const selectSubscribersState = createFeatureSelector<fromStore.SubscribersState>('subscribers');

export const getLoading = createSelector(selectSubscribersState, exportLoading);
export const getSubscriptors = createSelector(selectSubscribersState, exportSubscribers);
export const getSubscriptor = createSelector(selectSubscribersState, exportSubscriber);
export const getTotalSubscribers = createSelector(selectSubscribersState, exportTotalSubscribers);
export const getLastQuery = createSelector(selectSubscribersState, exportLastQuery);
