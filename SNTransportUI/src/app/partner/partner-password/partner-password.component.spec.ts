import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPasswordComponent } from './partner-password.component';

describe('PartnerPasswordComponent', () => {
  let component: PartnerPasswordComponent;
  let fixture: ComponentFixture<PartnerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
