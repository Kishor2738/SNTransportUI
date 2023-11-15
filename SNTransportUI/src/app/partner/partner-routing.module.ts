import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { PartnerDocumentsComponent } from './partner-documents/partner-documents.component';
import { PartnerHomeComponent } from './partner-home/partner-home.component';
import { PartnerInvoiceComponent } from './partner-invoice/partner-invoice.component';
import { PartnerPasswordComponent } from './partner-password/partner-password.component';
import { PartnerTripsComponent } from './partner-trips/partner-trips.component';

const routes: Routes = [
  { path: '', component: PartnerHomeComponent ,
    children:[
      {path:'dashboard',component:PartnerDashboardComponent,outlet:'partnerHome'},
      {path:'trips',component:PartnerTripsComponent,outlet:'partnerHome'},
      {path:'invoice',component:PartnerInvoiceComponent,outlet:'partnerHome'},
      {path:'details',component:PartnerDetailsComponent,outlet:'partnerHome'},
      {path:'updatePass',component:PartnerPasswordComponent,outlet:'partnerHome'},
      {path:'docs',component:PartnerDocumentsComponent,outlet:'partnerHome'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
