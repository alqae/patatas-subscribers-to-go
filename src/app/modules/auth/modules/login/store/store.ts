// import * as fromModels from '@app/models';

export interface LoginState {
  isLoading: boolean;
  loggedIn: boolean;
  // user?: fromModels.User;
  token?: string;
  error?: string;
}

export const initialState: LoginState = {
  isLoading: false,
  loggedIn: false,
};
