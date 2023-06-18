import { Subscriber } from '@app/models/subscriber';

export interface SubscribersState {
  isLoading: boolean;
  subscribers: Subscriber[];
  totalSubscribers: number;
  subscriber: Subscriber | null;
}

export const initialState: SubscribersState = {
  isLoading: false,
  subscribers: [],
  subscriber: null,
  totalSubscribers: 0,
};
