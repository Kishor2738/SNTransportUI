import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdateListComponent } from './order-update-list.component';

describe('OrderUpdateListComponent', () => {
  let component: OrderUpdateListComponent;
  let fixture: ComponentFixture<OrderUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUpdateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
