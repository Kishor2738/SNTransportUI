import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {CustomerService} from '../customer.service';
import { Appsettings } from '../../appsettings';


@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {
  
   //Column names need not to match with ModelProperties
   displayedColumns: string[] = ['InvoiceNo','DestinationAddress', 'OrderDate',
   'BillAmount', 'Actions'];
   public orderList: any = null;
   defaultImagePath="../assets/images/image_notuploaded.png";
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
 
  constructor(private customerService:CustomerService,private appSettings:Appsettings) { }

  ngOnInit(): void {
    this.GetAllInvoice();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();

    if (this.orderList.paginator) {
      this.orderList.paginator.firstPage();
    }
  }

  GetAllInvoice(){
    this.customerService.InvoiceByCustomer().subscribe({
      next:(res)=>{
        res.forEach(element => {
          element.OrderDate=new Date(element.OrderDate).toLocaleString();
          element.InvoiceDoc = !element.InvoiceDoc ? this.defaultImagePath :this.appSettings.API_ENDPOINT_Docs+element.InvoiceDoc;
          element.DeliveryChalanDoc = !element.DeliveryChalanDoc ? this.defaultImagePath :this.appSettings.API_ENDPOINT_Docs+element.DeliveryChalanDoc;
        });

        this.orderList = new MatTableDataSource(res);

        this.orderList.paginator = this.paginator;
        this.orderList.sort = this.sort;
      }
    });
  }


}
