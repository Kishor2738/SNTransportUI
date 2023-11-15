import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Appsettings } from '../../appsettings';

@Injectable({
  providedIn: 'root'
})
export class CustomerSectionService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  GetAllCustomer():Observable<any>
  {
    let Url=this.appSettings.API_ENDPOINT+'/api/AdminCustomer/GetAllCustomers';
    return this.http.get<any>(Url);
  }

  UpdatePartnerStatus(formData):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/AdminCustomer/UpdateCustomerStatus';
    formData.UpdatedBy=UserId; 
    return this.http.get<any>(url,{params:formData});
  }

  GetActiveCustomers():Observable<any>
  {
    let Url=this.appSettings.API_ENDPOINT+'/api/AdminCustomer/GetActiveCustomers';
    return this.http.get<any>(Url);
  }

}
