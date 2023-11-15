import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './shared/authorization/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) ,canActivate:[AuthGuard] }, //For dynamic loading
  { path: 'partner', loadChildren: () => import('./partner/partner.module').then(mod => mod.PartnerModule) ,canActivate:[AuthGuard] },
  { path: 'enterprise', loadChildren: () => import('./customer/customer.module').then(mod => mod.CustomerModule),canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
