import { TestBed } from '@angular/core/testing';

import { HttpTrackerService } from './http-tracker.service';

describe('HttpTrackerService', () => {
  let service: HttpTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
