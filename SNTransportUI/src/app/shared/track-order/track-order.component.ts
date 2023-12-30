import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { SharedComponentService } from '../shared-component.service';
import { AppService } from '../../app.service';
import swal from 'sweetalert2'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Remark', 'RemainingHours'];
  public transitGrid:any=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sharedComponentService:SharedComponentService,private appService:AppService,private datePipe: DatePipe) { 
    this.appService._TrackOrderFrom.subscribe(this.CheckClass);
  }

  trackForm:FormGroup;
  showTruck:Boolean=true;
  shipmentDetails:any;
  transitDetails:any;
  public myProps:any;
  classType:number;

  ngOnInit(): void {
    this.trackForm=new FormGroup({
      'invoiceNo' : new FormControl(null, Validators.required)
    });
  }


  CheckClass=(data)=>{
    this.classType=data;
    //console.log('B');
  }

  track()
  {
    if(this.trackForm.valid){
      let formData={
        InvoiceNo:this.trackForm.get('invoiceNo')?.value
      }
      this.sharedComponentService.GetShipmentDetails(formData).subscribe({
        next:(res)=>{
          if(res==null){
            this.showTruck=true;
            swal.fire({
              text: "Invoice Not Found.",
              icon: "error",
            });
          }
          else{
            this.shipmentDetails=res;
            this.myProps = { status: res.Status, classType: this.classType };
            this.showTruck=false;
            this.ShowDetails(formData);
          }
        }
      });
    }

  }

  ShowDetails(formData)
  {
    this.sharedComponentService.GetTransitDetails(formData).subscribe({
      next:(res)=>{
        //this.transitDetails=res;
        res.forEach(element => {
          element.Date=element.AdminUpdatedOn!="0001-01-01T00:00:00"?this.datePipe.transform(element.AdminUpdatedOn, 'dd/MM/yyyy'):this.datePipe.transform(element.PartnerUpdatedOn, 'dd/MM/yyyy');
        });
        this.transitGrid=new MatTableDataSource(res);
        
        this.transitGrid.paginator = this.paginator;
        this.transitGrid.sort = this.sort;
      }
    });
  }

}
