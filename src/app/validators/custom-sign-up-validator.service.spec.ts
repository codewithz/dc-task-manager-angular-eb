import { TestBed } from '@angular/core/testing';

import { CustomSignUpValidatorService } from './custom-sign-up-validator.service';

describe('CustomSignUpValidatorService', () => {
  let service: CustomSignUpValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSignUpValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
