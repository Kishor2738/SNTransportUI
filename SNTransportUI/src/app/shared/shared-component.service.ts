import { Injectable } from '@angular/core';
import { Appsettings } from '../appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedComponentService {

  constructor(private appSettings:Appsettings,private http:HttpClient) { }

  AddTransitUpdate(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/AddTransitUpdate';
    return this.http.post(url,formData);
  }

  GetShipmentDetails(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/GetShipmentDetails';
    return this.http.get<any>(url,{params:formData});
  }

  GetTransitDetails(formData):Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/AdminOrder/GetTransitDetails';
    return this.http.get<any>(url,{params:formData});
  }

}
