import { TestBed } from '@angular/core/testing';

import { CustomerSectionService } from './customer-section.service';

describe('CustomerSectionService', () => {
  let service: CustomerSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
