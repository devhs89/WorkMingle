import { TestBed } from '@angular/core/testing';

import { GenericInterceptor } from './generic.interceptor';

describe('GenericInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GenericInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GenericInterceptor = TestBed.inject(GenericInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
