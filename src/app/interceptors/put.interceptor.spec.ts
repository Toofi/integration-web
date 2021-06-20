import { TestBed } from '@angular/core/testing';

import { PutInterceptor } from './put.interceptor';

describe('PutInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PutInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PutInterceptor = TestBed.inject(PutInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
