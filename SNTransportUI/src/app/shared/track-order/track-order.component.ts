import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { SharedComponentService } from '../shared-component.service';
import { AppService } from '../../app.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  constructor(private sharedComponentService:SharedComponentService,private appService:AppService) { 
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
            //this.ShowDetails(formData);
          }
        }
      });
    }

  }

  ShowDetails(formData)
  {
    this.sharedComponentService.GetTransitDetails(formData).subscribe({
      next:(res)=>{
        this.transitDetails=res;
      }
    });
  }

}
