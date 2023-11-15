import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { CustomerPasswordComponent } from './customer-password/customer-password.component';

const routes: Routes = [
  { path:'', component: CustomerHomeComponent,
  children:[
      {path:'dashboard',component:CustomerDashboardComponent,outlet:'enterpriseHome'},
      {path:'add',component:AddOrderComponent,outlet:'enterpriseHome'},
      {path:'invoice',component:CustomerInvoiceComponent,outlet:'enterpriseHome'},
      {path:'details',component:CustomerDetailsComponent,outlet:'enterpriseHome'},
      {path:'updatePass',component:CustomerPasswordComponent,outlet:'enterpriseHome'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
