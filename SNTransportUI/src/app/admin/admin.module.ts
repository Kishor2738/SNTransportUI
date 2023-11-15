import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPasswordComponent } from './admin-section/admin-password/admin-password.component';
import { EstimatesComponent } from './admin-section/estimates/estimates.component';
import { NewOrderComponent } from './admin-section/new-order/new-order.component';
import { UploadInvoiceComponent } from './admin-section/upload-invoice/upload-invoice.component';
import { VerifyPartnerComponent } from './partner-section/verify-partner/verify-partner.component';
import { PartnerAccessComponent } from './partner-section/partner-access/partner-access.component';
import { UpdatePartnerComponent } from './partner-section/update-partner/update-partner.component';
import { CustomerAccessComponent } from './customer-section/customer-access/customer-access.component';
import { SharedModule } from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import { OrderForCustomerComponent } from './customer-section/order-for-customer/order-for-customer.component';
import { VerifyPartnerDocsComponent } from './partner-section/verify-partner-docs/verify-partner-docs.component';
import { VehicleMasterComponent } from './admin-section/vehicle-master/vehicle-master.component';
import { VehicleListComponent } from './admin-section/vehicle-list/vehicle-list.component';
import { AcceptOrderComponent } from './admin-section/accept-order/accept-order.component';
import { OrderUpdateListComponent } from './admin-section/order-update-list/order-update-list.component';
import { AddPaymentComponent } from './admin-section/add-payment/add-payment.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminPasswordComponent,
    EstimatesComponent,
    NewOrderComponent,
    UploadInvoiceComponent,
    VerifyPartnerComponent,
    PartnerAccessComponent,
    UpdatePartnerComponent,
    CustomerAccessComponent,
    OrderForCustomerComponent,
    VerifyPartnerDocsComponent,
    VehicleMasterComponent,
    VehicleListComponent,
    AcceptOrderComponent,
    OrderUpdateListComponent,
    AddPaymentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    SharedModule
  ]
})
export class AdminModule { }
