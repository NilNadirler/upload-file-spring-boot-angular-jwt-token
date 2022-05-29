import { TestBed } from '@angular/core/testing';

import { CorsModifierInterceptor } from './cors-modifier.interceptor';

describe('CorsModifierInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CorsModifierInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CorsModifierInterceptor = TestBed.inject(CorsModifierInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
