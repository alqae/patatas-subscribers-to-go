import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/subscribers.actions';

export function SubscribersReducer(state = fromStore.initialState, action: fromActions.SubscribersActions): fromStore.SubscribersState {
    switch (action.type) {
      case fromActions.SubscriberActionTypes.GetSubscribers:
      case fromActions.SubscriberActionTypes.GetSubscriber:
      case fromActions.SubscriberActionTypes.DeleteSubscriber:
        return {
          ...state,
          isLoading: true,
        };
      
      case fromActions.SubscriberActionTypes.GetSubscribersSuccess:
        return {
          ...state,
          subscribers: action.payload.Data,
          totalSubscribers: action.payload.Count,
          isLoading: false,
        };

      case fromActions.SubscriberActionTypes.GetSubscriberSuccess:
        return {
          ...state,
          subscriber: action.payload,
          isLoading: false,
        };

      case fromActions.SubscriberActionTypes.ClearSubscriber:
        return {
          ...state,
          subscriber: null,
          isLoading: false,
        };
        
      case fromActions.SubscriberActionTypes.GetSubscribersFailure:
      case fromActions.SubscriberActionTypes.GetSubscriberFailure:
      case fromActions.SubscriberActionTypes.DeleteSubscriberSuccess:
      case fromActions.SubscriberActionTypes.DeleteSubscriberFailure:
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
const exportSubscriber = (state: fromStore.SubscribersState) => state.subscriber;
const exportTotalSubscribers = (state: fromStore.SubscribersState) => state.totalSubscribers;
const selectSubscribersState = createFeatureSelector<fromStore.SubscribersState>('subscribers');

export const getLoading = createSelector(selectSubscribersState, exportLoading);
export const getSubscribers = createSelector(selectSubscribersState, exportSubscribers);
export const getSubscriber = createSelector(selectSubscribersState, exportSubscriber);
export const getTotalSubscribers = createSelector(selectSubscribersState, exportTotalSubscribers);
