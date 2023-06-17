import { userAuthenticathedGuard, userNotAuthenticathedGuard } from './user-authenticated.guard';

export const guards = [
  userAuthenticathedGuard, 
  userNotAuthenticathedGuard,
];

export * from './user-authenticated.guard';
