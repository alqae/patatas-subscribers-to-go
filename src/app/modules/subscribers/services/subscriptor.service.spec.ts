import { TestBed } from '@angular/core/testing';

import { SubscriptorService } from './subscriptor.service';

describe('SubscriptorService', () => {
  let service: SubscriptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
