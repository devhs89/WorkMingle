import { TestBed } from '@angular/core/testing';

import { EmployerFeaturesService } from './employer-features.service';

describe('EmployerFeaturesService', () => {
  let service: EmployerFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
