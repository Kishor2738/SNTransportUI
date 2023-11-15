import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  UpdatePassword(OldPassword,Password):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/Customer/UpdatePassword';
    
    var params={UserId:UserId,OldPassword:OldPassword,NewPassword:Password}
    return this.http.post(url,params);
  }

  AddNewOrder(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/CustomerOrder/AddOrder';
    return this.http.post(url,formData);
  }

  UpdatePersonalDetails(formData):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/Customer/UpdateCustomerDetails';
    formData.CustomerID=UserId; 
    return this.http.post(url,formData);
  }

  GetOrderByCustomer():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/CustomerOrder/OrderByCustomer';
    var params={
      CustomerId:sessionStorage.getItem("userId")
    };
    return this.http.get<any>(url,{params:params});
  }

  CancelOrder(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/CustomerOrder/CancelByCustomer';
    return this.http.put<any>(url,formData);
  }

  InvoiceByCustomer():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/CustomerOrder/InvoiceByCustomer';
    var params={
      CustomerId:sessionStorage.getItem("userId")
    };
    return this.http.get<any>(url,{params:params});
  }

  CustomerDashboard():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Customer/CustomerDashboard';
    var params={
      CustomerId:sessionStorage.getItem("userId")
    };
    return this.http.get<any>(url,{params:params});
  }

}
