import { Injectable } from '@angular/core';
import { Appsettings } from '../../appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PartnerSectionService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  GetAllPartners():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/GetAllPartners';
    return this.http.get(url);
  }

  UpdatePartnerStatus(formData):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/UpdatePartnerStatus';
    formData.UpdatedBy=UserId; 
    return this.http.get<any>(url,{params:formData});
  }

  GetActivePartners():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/GetActivePartners';
    return this.http.get(url);
  }

  GetPartnerDetailsById(partnerId):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/GetPartnerDetailsById';
    let param={PartnerId:partnerId};
    return this.http.get(url,{params:param});
  }

  UpdatePartnerDetails(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/UpdatePartnerDetails';
    return this.http.post(url,formData);
  }

  UpdatePartnerDoc(formData):Observable<any>
  {
    let UserId=sessionStorage.getItem("userId");
    let url=this.appSettings.API_ENDPOINT+'/api/AdminPartner/VerifyPartnerDocs';
    formData.ReviewBy=UserId; 
    return this.http.put<any>(url,formData);
  }

}
