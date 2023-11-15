import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerPasswordComponent } from './customer-password/customer-password.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerDashboardComponent,
    CustomerPasswordComponent,
    CustomerDetailsComponent,
    CustomerInvoiceComponent,
    AddOrderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    AddOrderComponent
  ]
})
export class CustomerModule { }
