import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import {AppService} from '../../app.service';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  //Column names need not to match with ModelProperties
  displayedColumns: string[] = ['PickUpAddress','DestinationAddress','PickUpTime',
  'RecipientName','VehicleType', 'Actions'];
  public orderList: any = null;
  public dahboardDetails:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _customerService:CustomerService,private appService:AppService) { }

  ngOnInit(): void {
    this.GetOrders();
    this.GetDashboard();
    this.appService._TrackOrderFrom.next(1);
  }

  GetDashboard(){
    this._customerService.CustomerDashboard().subscribe({
      next:(res)=> {
       this.dahboardDetails=res; 
      }
    });
  }

  GetOrders(){
    this._customerService.GetOrderByCustomer().subscribe({
      next:(res)=>{
        if(res.length==0){
          this.orderList=null;
        }
        else{

          res.forEach(element => {
            element.PickUpTime=new Date(element.PickUpTime).toLocaleString();
          });

          this.orderList = new MatTableDataSource(res);

          this.orderList.paginator = this.paginator;
          this.orderList.sort = this.sort;
        }
        
      }
    });
  }

  confirmCancellation(row) {
    swal.fire({
      title: "Are you sure you want to cancel this Order?This is a non-reversible step.",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelOrder(row);
      } 
    })
  }

  cancelOrder(row){
    let formData={
      OrderId:row.OrderId,
      Status:2
    }
    this._customerService.CancelOrder(formData).subscribe({
      next:(res)=>{
        swal.fire({
          text: res.Message,
          icon: "success",
        }).then((res)=>{
          this.GetOrders();
        });;
      }
    });
  }

  

}
