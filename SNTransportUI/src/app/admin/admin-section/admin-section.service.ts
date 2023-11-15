import { Injectable } from '@angular/core';
import { Appsettings } from '../../appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminSectionService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  UpdatePassword(formData):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/Admin/UpdatePassword';
    formData.UserId=UserId;
    return this.http.post(url,formData);
  }

  GetNewEstimates():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Admin/GetEstimates';
    return this.http.get(url);
  }

  DeleteEstimate(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Estimate/DeleteEstimate';
    return this.http.delete(url,{params:formData});
  }

  GetNewOrders():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/GetNewOrder';
    return this.http.get(url);
  }

  UpdateOrderStatus(formData):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/UpdateOrderStatus';
    formData.UpdatedBy=UserId; 
    return this.http.put<any>(url,formData);
  }

  GetAllVehicle():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminVehicle/GetAllVehicles';
    return this.http.get(url);
  }

  AddVehicle(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminVehicle/AddNewVehicles';
    return this.http.post(url,formData);
  }

  UpdateVehicle(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminVehicle/UpdateVehicle';
    return this.http.put<any>(url,formData);
  }

  DeleteVehicle(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminVehicle/DeleteVehicle';
    return this.http.delete(url,{params:formData});
  }

  GetPartnerByVehicle(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/GetPartnerByVehicleTypeId';
    return this.http.get(url,{params:formData});
  }

  AcceptOrder(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/AcceptOrder';
    return this.http.post(url,formData);
  }

  GetOrderByInvoice(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/GetOrderByInvoice';
    return this.http.get(url,{params:formData});
  }

  UpdateOrderDoc(body):Observable<any>{ 
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/UpdateOrderDoc';
    return this.http.post(url,body);
  }

  GetOrdersToUpdate():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/GetOrdersToUpdate';
    return this.http.get(url);
  }

  AddPayment(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/AddPayment';
    return this.http.post(url,formData);
  }


}
