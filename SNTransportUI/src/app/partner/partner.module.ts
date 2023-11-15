import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerHomeComponent } from './partner-home/partner-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import { PartnerPasswordComponent } from './partner-password/partner-password.component';
import { PartnerDocumentsComponent } from './partner-documents/partner-documents.component';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { PartnerInvoiceComponent } from './partner-invoice/partner-invoice.component';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { PartnerTripsComponent } from './partner-trips/partner-trips.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnerMessageComponent } from './partner-message/partner-message.component';


@NgModule({
  declarations: [
    PartnerHomeComponent,
    PartnerPasswordComponent,
    PartnerDocumentsComponent,
    PartnerDashboardComponent,
    PartnerInvoiceComponent,
    PartnerDetailsComponent,
    PartnerTripsComponent,
    PartnerMessageComponent
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule    
  ]
})
export class PartnerModule { }
