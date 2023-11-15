import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  UpdatePassword(OldPassword,Password):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/Partner/UpdatePartnerPassword';
    
    var params={UserId:UserId,OldPassword:OldPassword,NewPassword:Password}
    return this.http.post(url,params);
  }

  UploadFile(body):Observable<any>{ 
    let url=this.appSettings.API_ENDPOINT+'/api/PartnerDocuments/UploadDocuments';
    return this.http.post(url,body);
  }

  GetUploadedDocuments(ID)
  {
    let url=this.appSettings.API_ENDPOINT+'/api/PartnerDocuments/GetPartnerDocuments';
    var params={
      ID:ID
    }
    return this.http.get<any>(url,{params:params});
  }

  GetOrderToPickUP(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Partner/GetOrderToPickUp';
    return this.http.get<any>(url,{params:formData});
  }

  GetOrderToUpdate(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Partner/GetOrderToUpdate';
    return this.http.get<any>(url,{params:formData});
  }

  OrderCountPartner(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Partner/OrderCountPartner';
    return this.http.get<any>(url,{params:formData});
  }

  StartTrip(OrderId):Observable<any>{ 
    let url=this.appSettings.API_ENDPOINT+'/api/Partner/StartTrip?OrderId='+OrderId;
    return this.http.post(url,{});
  }


}
