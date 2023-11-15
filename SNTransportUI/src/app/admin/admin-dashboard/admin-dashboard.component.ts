import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  dahboardDetails:any;
  constructor(private appService:AppService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.appService._TrackOrderFrom.next(1);
    this.GetDashboard();
  }

  GetDashboard(){
    this.adminService.GetDashboard().subscribe({
      next:(res)=> {
        this.dahboardDetails=res;
      }
    });
  }

}

