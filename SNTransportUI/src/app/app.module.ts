import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { ForPartnersComponent } from './home/for-partners/for-partners.component';
import { ForEnterpriseComponent } from './home/for-enterprise/for-enterprise.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';

import { SupportPageComponent } from './support-page/support-page.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { Appsettings } from './appsettings';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomepageComponent,
    ForPartnersComponent,
    ForEnterpriseComponent,
    SupportPageComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    NgbModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    })
  ],
  providers: [Appsettings,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
