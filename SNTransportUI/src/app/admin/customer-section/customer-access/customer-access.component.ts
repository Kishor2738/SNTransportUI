import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import {CustomerSectionService} from '../customer-section.service'

@Component({
  selector: 'app-customer-access',
  templateUrl: './customer-access.component.html',
  styleUrls: ['./customer-access.component.css']
})
export class CustomerAccessComponent implements OnInit {

  //Column names need not o match with ModelProperties
  displayedColumns: string[] = ['CompanyName','CPName','CPMail', 'CPNumber','Actions'];
  public customerList:any=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerSectionService:CustomerSectionService) { }

  ngOnInit(): void {
    this.GetAllCustomers();
  }

  GetAllCustomers()
  {
    this.customerSectionService.GetAllCustomer().subscribe({
      next:(res)=>{
        this.customerList=new MatTableDataSource(res);

        this.customerList.paginator=this.paginator;
        this.customerList.sort=this.sort;
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

  updateAccess(row,status){
    let formData={
      CustomerId:row.CustomerId,
      Status:status
    }
    this.customerSectionService.UpdatePartnerStatus(formData).subscribe({
      next:(res)=>{
        row.Status=status;
      }
    });
  }

}
