import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AdminSectionService} from '../admin-section.service';
import swal from 'sweetalert2'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  //Column names need not to match with ModelProperties
  displayedColumns: string[] = ['CompanyName', 'CPName', 'CPNumber','PickUpAddress',
  'DestinationAddress',  'Actions'];
  public orderList: any = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminSectionService:AdminSectionService,private _router:Router) { }

  ngOnInit(): void {
    this.GetNewOrders();
  }

  GetNewOrders(){
    this.adminSectionService.GetNewOrders().subscribe({
      next:(res)=>{
        this.orderList = new MatTableDataSource(res);

        this.orderList.paginator = this.paginator;
        this.orderList.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();

    if (this.orderList.paginator) {
      this.orderList.paginator.firstPage();
    }
  }

  acceptOrder(row) {
    this._router.navigate(['/admin', { outlets: { 'adminHome': ['acceptOrder', row.OrderId] } }]);
  }

  cancelOrder(row){
    let formData={
      OrderId:row.OrderId,
      Status:3
    }
    this.adminSectionService.UpdateOrderStatus(formData).subscribe({
      next:(res)=>{
        swal.fire({
          text: res.Message,
          icon: "success",
        }).then((res)=>{
          this.GetNewOrders();
        });;
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



}
