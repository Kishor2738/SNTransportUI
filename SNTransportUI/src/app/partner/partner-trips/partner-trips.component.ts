import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartnerService } from '../partner.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTransitComponent } from '../../shared/update-transit/update-transit.component';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-partner-trips',
  templateUrl: './partner-trips.component.html',
  styleUrls: ['./partner-trips.component.css']
})
export class PartnerTripsComponent implements OnInit {

   //Column names need not to match with ModelProperties
   displayedColumns: string[] = ['DestinationAddress','RecipientName' ,'RecipientNumber', 'Actions'];
   public orderList: any = null;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
 
  constructor(private partnerService:PartnerService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.GetOrdersToUpdate();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();

    if (this.orderList.paginator) {
      this.orderList.paginator.firstPage();
    }
  }

  GetOrdersToUpdate(){
    let formData={
      PartnerId:sessionStorage.getItem("userId")
    }
    this.partnerService.GetOrderToUpdate(formData).subscribe({
      next:(res)=>{
        this.orderList=new MatTableDataSource(res);

        this.orderList.paginator = this.paginator;
        this.orderList.sort = this.sort;
      }
    });
  }

  updateOrder(row){
    let rowData=row;
    rowData.From='Partner'
    this.dialog.open(UpdateTransitComponent,{
      height: '450px',
      width: '650px',
      data:{
        data:rowData
      }
    })
  }

}
