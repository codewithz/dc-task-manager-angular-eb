import { TestBed } from '@angular/core/testing';

import { JwtUnauthorizedService } from './jwt-unauthorized.service';

describe('JwtUnauthorizedService', () => {
  let service: JwtUnauthorizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtUnauthorizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
