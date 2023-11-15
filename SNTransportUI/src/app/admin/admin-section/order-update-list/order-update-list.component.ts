import { Component, OnInit , ViewChild} from '@angular/core';
import { AdminSectionService } from '../admin-section.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2'; 
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { UpdateTransitComponent } from '../../../shared/update-transit/update-transit.component';


@Component({
  selector: 'app-order-update-list',
  templateUrl: './order-update-list.component.html',
  styleUrls: ['./order-update-list.component.css']
})
export class OrderUpdateListComponent implements OnInit {

  displayedColumns: string[] = ['InvoiceNo', 'Partner Details', 'Recipent Details', 'Destination_Address','Action'];
  public orderList:any=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminSectionService:AdminSectionService,private dialog:MatDialog) { }


  ngOnInit(): void {
    this.GetOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();

    if (this.orderList.paginator) {
      this.orderList.paginator.firstPage();
    }
  }

  GetOrders(){
    this.adminSectionService.GetOrdersToUpdate().subscribe({
      next:(res)=>{
        this.orderList=new MatTableDataSource(res);

        this.orderList.paginator = this.paginator;
        this.orderList.sort = this.sort;
      }
    });
  }

  addPayment(row){
    this.dialog.open(AddPaymentComponent,{
      height: '450px',
      width: '650px',
      data:{
        data:row
      }
    }).afterClosed().subscribe(()=>{this.GetOrders();});;
  }

  confirmCompletion(row) {
    swal.fire({
      title: "Are you sure you want to complete this Order?This is a non-reversible step.",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.complteOrder(row);
      } 
    });
  }

  complteOrder(row){
    let formData={
      OrderId:row.OrderId,
      Status:6
    }
    this.adminSectionService.UpdateOrderStatus(formData).subscribe({
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

  addUpdate(row){
    let rowData=row;
    rowData.From='Admin'
    this.dialog.open(UpdateTransitComponent,{
      height: '450px',
      width: '650px',
      data:{
        data:rowData
      }
    })
  }


}
