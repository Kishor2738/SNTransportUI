import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  VerifyLogin(Url,Email,Password):Observable<any>
  {
    var params={
      Email:Email,Password:Password
    }
    return this.http.get<any>(Url,{params:params});
  }

  AddPartner(Name,Phone,Email,Password):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Partner/AddPartner';
    var params={
      Name:Name,PhoneNumber:Phone,Email:Email,Password:Password
    }
    return this.http.post(url,params);
  }

  AddCustomer(Company,CPName,CPPhone,Trips,Email,Password):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Customer/AddCustomer';
    var params={CompanyName:Company,CPName:CPName,CPNumber:CPPhone,
      MonthlyTrips:Trips,CPMail:Email,Password:Password
    }
    return this.http.post(url,params);
  }

  AddEstimate(Pickup,Drop,Phone,Name):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Estimate/AddEstimate';
    var params={
      PickUp_Address:Pickup,Destination_Address:Drop,PhoneNumber:Phone,Name:Name
    }
    return this.http.post(url,params);
  }

}
