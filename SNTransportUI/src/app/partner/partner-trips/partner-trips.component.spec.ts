import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTripsComponent } from './partner-trips.component';

describe('PartnerTripsComponent', () => {
  let component: PartnerTripsComponent;
  let fixture: ComponentFixture<PartnerTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
