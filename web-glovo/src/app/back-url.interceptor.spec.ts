import { TestBed } from '@angular/core/testing';

import { BackUrlInterceptor } from './back-url.interceptor';

describe('BackUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BackUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BackUrlInterceptor = TestBed.inject(BackUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
