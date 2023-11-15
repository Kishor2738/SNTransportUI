import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swal from 'sweetalert2'; 
import { AdminSectionService } from '../admin-section.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<AddPaymentComponent>,
  private adminSectionService:AdminSectionService) { }
  
  _orderDetails:any;
  pwAddPayment:FormGroup;

  ngOnInit(): void {
    this.pwAddPayment=new FormGroup({
      'balance' : new FormControl({value:null,disabled:true}),
      'amount' : new FormControl(null, Validators.required),
      'paymentDate' : new FormControl(null, Validators.required),
    });

    this._orderDetails=this.data.data;
    this.pwAddPayment.patchValue({
      balance: this._orderDetails.Balance,
    });

  }

  touchAllFields()
  {
    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwAddPayment.controls).forEach(field => {
      const control = this.pwAddPayment.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  addPayment(){
    this.touchAllFields();
    if(this.pwAddPayment.valid){
      let formData={
        OrderId:this._orderDetails.OrderId,
        AmountPaid:this.pwAddPayment.get('amount').value,
        PaymentDate:this.pwAddPayment.get('paymentDate').value,
        CreatedByAdmin:sessionStorage.getItem("userId")
      };

      this.adminSectionService.AddPayment(formData).subscribe({
        next:(res)=>{
          if(res.Code==405){
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
              this.dialogRef.close();
            });
          }
        }
      });

    }
  }

  cancel(){
    this.dialogRef.close();
  }

}
