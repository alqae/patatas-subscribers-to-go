import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userAuthenticathedGuard } from './user-authenticated.guard';

describe('userAuthenticathedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userAuthenticathedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
