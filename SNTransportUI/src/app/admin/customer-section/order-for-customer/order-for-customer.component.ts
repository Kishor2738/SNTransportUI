import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerSectionService } from '../customer-section.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AddOrderComponent} from '../../../customer/add-order/add-order.component';
import { AppService } from '../../../app.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-order-for-customer',
  templateUrl: './order-for-customer.component.html',
  styleUrls: ['./order-for-customer.component.css']
})
export class OrderForCustomerComponent implements OnInit {

  //Column names need not to match with ModelProperties
  displayedColumns: string[] = ['CompanyName', 'CPName', 'CPMail', 'CPNumber', 'Actions'];
  public customerList: any = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerSectionService: CustomerSectionService,private dialog:MatDialog,
    private appService:AppService) { }

  ngOnInit(): void {
    this.GetActiveCustomers();
  }

  GetActiveCustomers() {
    this.customerSectionService.GetActiveCustomers().subscribe({
      next: (res) => {
        this.customerList = new MatTableDataSource(res);

        this.customerList.paginator = this.paginator;
        this.customerList.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerList.filter = filterValue.trim().toLowerCase();

    if (this.customerList.paginator) {
      this.customerList.paginator.firstPage();
    }
  }

  verifyCustomer(row) {

    swal.fire({
      title: "This action will add a <span style='color:red;'> New Order </span> from this Customer.Do you want to proceed?",
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      //denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        //denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        //swal.fire('Saved!', '', 'success')
        this.openAddOrderMenu(row);
      } 
    })
    

  }


  openAddOrderMenu(row){
    this.dialog.open(AddOrderComponent,{
      height: '550px',
      width: '950px'
    });
    this.appService._adminCustomerId.next(row.CustomerId);
  }

}
