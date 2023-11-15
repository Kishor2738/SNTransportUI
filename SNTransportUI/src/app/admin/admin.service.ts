import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private appSettings:Appsettings) { }

  VerifyLogin(UserName,Password):Observable<any>
  {
    let Url=this.appSettings.API_ENDPOINT+'/api/Admin/VerifyLogin';
    var params={
      UserName:UserName,Password:Password
    }
    return this.http.get<any>(Url,{params:params});
  }

  GetDashboard():Observable<any>
  {
    let url=this.appSettings.API_ENDPOINT+'/api/Admin/AdminDashboard';
    return this.http.get(url);
  }

}
