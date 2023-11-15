import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPartnerDocsComponent } from './verify-partner-docs.component';

describe('VerifyPartnerDocsComponent', () => {
  let component: VerifyPartnerDocsComponent;
  let fixture: ComponentFixture<VerifyPartnerDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPartnerDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPartnerDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
