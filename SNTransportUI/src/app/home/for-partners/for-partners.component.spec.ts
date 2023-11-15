import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPartnersComponent } from './for-partners.component';

describe('ForPartnersComponent', () => {
  let component: ForPartnersComponent;
  let fixture: ComponentFixture<ForPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
