import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartnerService } from '../partner.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTransitComponent } from '../../shared/update-transit/update-transit.component';


@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit {

  //Column names need not to match with ModelProperties
  displayedColumns: string[] = ['PickUpAddress','CPName' ,'CPNumber','PickUpTime','ApproxWeight', 'Actions'];
  public orderList: any = null;
  public showOrder:boolean=false;
  public orderCount:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private partnerService:PartnerService) { }

  ngOnInit(): void {
    this.GetOrdersToPickUp();
    this.GetOrderCount();
  }

  GetOrdersToPickUp(){
    let formData={
      PartnerId:sessionStorage.getItem("userId")
    }
    this.partnerService.GetOrderToPickUP(formData).subscribe({
      next:(res)=>{
        this.orderList=new MatTableDataSource(res);

        this.orderList.paginator = this.paginator;
        this.orderList.sort = this.sort;
        if(res.length>0){
          this.showOrder=true;
        }
        else{
          this.showOrder=false;
        }
      }
    });
  }

  GetOrderCount(){
    let formData={
      PartnerId:sessionStorage.getItem("userId")
    }
    this.partnerService.OrderCountPartner(formData).subscribe({
      next:(res)=>{
        this.orderCount=res;
      }
    });
  }

  startTrip(row){
    this.partnerService.StartTrip(row.OrderId).subscribe({
      next:(res)=>{
        this.GetOrdersToPickUp();
      }
    });
  }

}
