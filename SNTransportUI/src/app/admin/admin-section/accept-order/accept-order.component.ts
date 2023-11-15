import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'; 
import {AdminSectionService} from '../admin-section.service';


@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {

  constructor(private _router:Router,private _activatedRoute:ActivatedRoute,
    private _adminSectionService:AdminSectionService) { }

  VehicleList:any;
  DriverList:any;
  _OrderId:any;

  driverNotSelected:boolean=true;
  vehicleNotSelected:boolean=true;
  pwAcceptOrder: FormGroup;
  selectedVehicle:number;
  selectedDriver:number;

  ngOnInit(): void {
    this.pwAcceptOrder= new FormGroup({
      'invoice': new FormControl(null, Validators.required),
      'bill': new FormControl(null, Validators.required),
      'paid': new FormControl(null, Validators.required),
      'hours': new FormControl(null, Validators.required),
      'vehicle': new FormControl(null, Validators.required),
      'driver': new FormControl(null, Validators.required)
    });

    this._OrderId=this._activatedRoute.snapshot.paramMap.get('id');

    this.pwAcceptOrder.controls['vehicle'].setValue(0);
    this.pwAcceptOrder.controls['driver'].setValue(0);
    this.GetAllVehicle();
  }

  changeVehicle(e: any) {
    this.pwAcceptOrder.controls['vehicle']?.setValue(e.target.value, {
      onlySelf: true,
    });
    if(this.pwAcceptOrder.value.vehicle==0){
      this.vehicleNotSelected=true;
    }
    else{
      this.vehicleNotSelected=false;
    }
    this.GetPartnerByVehicle();
  }

  changeDriver(e:any){
    this.pwAcceptOrder.controls['driver']?.setValue(e.target.value, {
      onlySelf: true,
    });

    if(this.pwAcceptOrder.value.driver==0){
      this.driverNotSelected=true;
    }
    else{
      this.driverNotSelected=false;
    }
  }

  clearForm(){
    this.pwAcceptOrder.reset();
    this.driverNotSelected=false;
    this.vehicleNotSelected=false;

    this.pwAcceptOrder.controls['vehicle'].setValue(0);
    this.pwAcceptOrder.controls['driver'].setValue(0);
  }

  touchAllFields()
  {
    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwAcceptOrder.controls).forEach(field => {
      const control = this.pwAcceptOrder.get(field);
      control.markAsTouched({ onlySelf: true });
     });

     //this.driverNotSelected=true;
     //this.vehicleNotSelected=true;
  }

  GetAllVehicle(){
    this._adminSectionService.GetAllVehicle().subscribe({
      next:(res)=>{
        this.VehicleList=res;
        this.pwAcceptOrder.controls['vehicle'].setValue(0);
      }
    });
  }

  GetPartnerByVehicle(){
    let formData={
      //VehicleTypeId:this.pwAcceptOrder.get('vehicle').value
      VehicleTypeId:this.pwAcceptOrder.value.vehicle
    };

    this._adminSectionService.GetPartnerByVehicle(formData).subscribe({
      next:(res)=>{
        this.DriverList=res;
        this.pwAcceptOrder.controls['driver'].setValue(0);
      }
    });
  }

  cancel(){
    this._router.navigate(['/admin',{outlets:{'adminHome':['newOrder']}}]);
  }

  acceptOrder()
  {
    this.touchAllFields();
    if(this.pwAcceptOrder.valid && !this.driverNotSelected && !this.vehicleNotSelected){
      let formData={
        OrderId:this._OrderId,
        InvoiceNo:this.pwAcceptOrder.get('invoice').value,
        BillAmount:this.pwAcceptOrder.get('bill').value,
        AdvancePaid:this.pwAcceptOrder.get('paid').value,
        HoursInDelivery:this.pwAcceptOrder.get('hours').value,
        PartnerId:this.pwAcceptOrder.value.driver,
        UpdatedByAdmin:sessionStorage.getItem("userId")
      }
      if(this.pwAcceptOrder.get('paid').value>this.pwAcceptOrder.get('bill').value){
        Swal.fire("Advance paid can not be more than Bill Amount.");
      }
      else{
        this._adminSectionService.AcceptOrder(formData).subscribe({
          next:(res)=>{
  
            if(res.Code==409){
              swal.fire({
                text: res.Message,
                icon: "error",
              })
            }
            else{
              swal.fire({
                text: res.Message,
                icon: "success",
              }).then(()=>{
                this.cancel();
              });
            }
          
          }
        });
  
      }
    }
  }


}
