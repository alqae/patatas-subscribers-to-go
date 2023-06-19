import * as fromModels from '@app/models';

export interface SubscribersState {
  isLoading: boolean;
  subscribers: fromModels.Subscriptor[];
  totalSubscribers: number;
  subscriptor: fromModels.Subscriptor | null;
  lastQuery?: fromModels.Filter;
}

export const initialState: SubscribersState = {
  isLoading: false,
  subscribers: [],
  subscriptor: null,
  totalSubscribers: 0,
};
