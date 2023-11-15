import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransitComponent } from './update-transit.component';

describe('UpdateTransitComponent', () => {
  let component: UpdateTransitComponent;
  let fixture: ComponentFixture<UpdateTransitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTransitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
