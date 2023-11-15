import { TestBed } from '@angular/core/testing';

import { AdminSectionService } from './admin-section.service';

describe('AdminSectionService', () => {
  let service: AdminSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
