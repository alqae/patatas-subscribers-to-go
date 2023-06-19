import * as fromModels from '@app/models';

export interface SubscribersState {
  isLoading: boolean;
  subscribers: fromModels.Subscriber[];
  totalSubscribers: number;
  subscriber: fromModels.Subscriber | null;
  lastQuery?: fromModels.Filter;
}

export const initialState: SubscribersState = {
  isLoading: false,
  subscribers: [],
  subscriber: null,
  totalSubscribers: 0,
};
