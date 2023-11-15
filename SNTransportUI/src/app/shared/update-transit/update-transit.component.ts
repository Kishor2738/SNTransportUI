import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swal from 'sweetalert2'; 
import {SharedComponentService} from '../shared-component.service';


@Component({
  selector: 'app-update-transit',
  templateUrl: './update-transit.component.html',
  styleUrls: ['./update-transit.component.css']
})
export class UpdateTransitComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateTransitComponent>,
  private sharedComponentService:SharedComponentService) { }

  pwTransitUpdate: FormGroup;
  _orderDetails:any;

  ngOnInit(): void {
    this.pwTransitUpdate= new FormGroup({
      'remainingHour': new FormControl(null, Validators.required),
      'remark': new FormControl(null, Validators.required)
    });

    this._orderDetails=this.data.data;
  }

  touchAllFields()
  {
    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwTransitUpdate.controls).forEach(field => {
      const control = this.pwTransitUpdate.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  cancel(){
    this.dialogRef.close();
  }
  
  clearForm(){
    this.pwTransitUpdate.reset();
  }


  addUpdate() {
    if (this.pwTransitUpdate.valid) {
      let formData: any;
      formData = {
        RemainingHours: this.pwTransitUpdate.get('remainingHour').value,
        Remark: this.pwTransitUpdate.get('remark').value,
        OrderId: this._orderDetails.OrderId
      }
      if (this._orderDetails.From == 'Admin') {
        formData.AdminUpdatedOn = new Date();
        formData.UpdatedByAdmin = sessionStorage.getItem("userId");
      }
      else {
        formData.PartnerUpdatedOn = new Date();
        formData.PartnerId = sessionStorage.getItem("userId");
      }

      this.sharedComponentService.AddTransitUpdate(formData).subscribe({
        next:(res)=>{
          swal.fire({
            text: res.Message,
            icon: "success",
          }).then(()=>{
            this.cancel();
          });
        }
      });


    }
  }


}