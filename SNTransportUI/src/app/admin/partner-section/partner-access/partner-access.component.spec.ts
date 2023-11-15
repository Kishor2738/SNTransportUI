import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAccessComponent } from './partner-access.component';

describe('PartnerAccessComponent', () => {
  let component: PartnerAccessComponent;
  let fixture: ComponentFixture<PartnerAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
