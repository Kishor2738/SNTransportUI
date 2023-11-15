import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent} from './admin-home/admin-home.component';
import { AcceptOrderComponent } from './admin-section/accept-order/accept-order.component';
import { AdminPasswordComponent } from './admin-section/admin-password/admin-password.component';
import { EstimatesComponent } from './admin-section/estimates/estimates.component';
import { NewOrderComponent } from './admin-section/new-order/new-order.component';
import { OrderUpdateListComponent } from './admin-section/order-update-list/order-update-list.component';
import { UploadInvoiceComponent } from './admin-section/upload-invoice/upload-invoice.component';
import { VehicleListComponent } from './admin-section/vehicle-list/vehicle-list.component';
import { CustomerAccessComponent } from './customer-section/customer-access/customer-access.component';
import { OrderForCustomerComponent } from './customer-section/order-for-customer/order-for-customer.component';
import { PartnerAccessComponent } from './partner-section/partner-access/partner-access.component';
import { UpdatePartnerComponent } from './partner-section/update-partner/update-partner.component';
import { VerifyPartnerDocsComponent } from './partner-section/verify-partner-docs/verify-partner-docs.component';
import { VerifyPartnerComponent } from './partner-section/verify-partner/verify-partner.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent,
    children: [
      //{ path: '', component: AdminDashboardComponent, outlet: 'adminHome' },
      { path: 'dashboard', component: AdminDashboardComponent, outlet: 'adminHome' },

      { path: 'estimates', component: EstimatesComponent, outlet: 'adminHome' },
      { path: 'vehicleMaster', component: VehicleListComponent, outlet: 'adminHome' },
      { path: 'adminPassword', component: AdminPasswordComponent, outlet: 'adminHome' },

      { path: 'newOrder', component: NewOrderComponent, outlet: 'adminHome' },
      { path: 'acceptOrder/:id', component: AcceptOrderComponent, outlet: 'adminHome' },
      { path: 'orderList', component: OrderUpdateListComponent, outlet: 'adminHome' },
      { path: 'uploadInvoice', component: UploadInvoiceComponent, outlet: 'adminHome' },
      

      { path: 'verifyPartner', component: VerifyPartnerComponent, outlet: 'adminHome' },
      { path: 'partnerAccess', component: PartnerAccessComponent, outlet: 'adminHome' },
      { path: 'updatePartnerDetails/:id', component: UpdatePartnerComponent, outlet: 'adminHome' },
      { path: 'verifyPartnerDocs/:id', component: VerifyPartnerDocsComponent, outlet: 'adminHome' },

      { path: 'customerAccess', component: CustomerAccessComponent, outlet: 'adminHome' },
      { path: 'customerOrder', component: OrderForCustomerComponent, outlet: 'adminHome' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
