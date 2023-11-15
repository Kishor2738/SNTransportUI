import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForCustomerComponent } from './order-for-customer.component';

describe('OrderForCustomerComponent', () => {
  let component: OrderForCustomerComponent;
  let fixture: ComponentFixture<OrderForCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderForCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
