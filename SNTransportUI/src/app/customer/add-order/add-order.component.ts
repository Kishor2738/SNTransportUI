import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { AppService } from '../../app.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(private customerService:CustomerService,private appService:AppService) { 
    this.appService._adminCustomerId.subscribe(this.GetCustomerId);
  }
  formAddOrder:FormGroup;
  _customerId:any;

  ngOnInit(): void {
    this.formAddOrder=new FormGroup({
      'pickUp' : new FormControl(null, Validators.required),
      'destination' : new FormControl(null, Validators.required),
      'recipient' : new FormControl(null, Validators.required),
      'recipientContact' : new FormControl(null, Validators.required),
      'pickUpTime' : new FormControl(null, Validators.required),
      'approxWeight' : new FormControl(null, Validators.required),
      'vehicleType' : new FormControl(null, Validators.required)
    });
  }

  TouchFields()
  {
    Object.keys(this.formAddOrder.controls).forEach(field => {
      const control = this.formAddOrder.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  clearForm(){
    this.formAddOrder.reset();
  }

  GetCustomerId=(data)=>{
    this._customerId=data;
  }

  addOrder(){
    this.TouchFields();
    if(this.formAddOrder.valid){
      let UserId=sessionStorage.getItem("userId");
      if(this._customerId!=undefined){
        UserId=this._customerId;
      }
      let formData = {
        PickUpAddress: this.formAddOrder.get('pickUp').value.replace(/(\r\n|\n|\r)/gm, ","),
        DestinationAddress: this.formAddOrder.get('destination').value.replace(/(\r\n|\n|\r)/gm, ","),
        RecipientName: this.formAddOrder.get('recipient').value,
        RecipientNumber: this.formAddOrder.get('recipientContact').value,
        PickUpTime: this.formAddOrder.get('pickUpTime').value,
        ApproxWeight: this.formAddOrder.get('approxWeight').value,
        VehicleType: this.formAddOrder.get('vehicleType').value,
        Status:1,
        CustomerID:UserId
      }
      this.customerService.AddNewOrder(formData).subscribe(
        {
            next:(res)=>{
              if(res.Code==500){
                swal.fire({
                  text: res.Message,
                  icon: "error",
                });
              }
              else{
                swal.fire({
                  text: res.Message,
                  icon: "success",
                });
                this.clearForm();
              }
          },
          error:()=> console.log('error')
        }
      );
    }
    else{
      console.log('invalid form');
    }
  }


}
