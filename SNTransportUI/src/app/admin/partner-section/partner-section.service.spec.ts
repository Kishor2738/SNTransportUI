import { TestBed } from '@angular/core/testing';

import { PartnerSectionService } from './partner-section.service';

describe('PartnerSectionService', () => {
  let service: PartnerSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
