import { TestBed } from '@angular/core/testing';

import { RefreshHeaderService } from './refresh-header.service';

describe('RefreshHeaderService', () => {
  let service: RefreshHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
