import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-customer-password',
  templateUrl: './customer-password.component.html',
  styleUrls: ['./customer-password.component.css']
})
export class CustomerPasswordComponent implements OnInit {

  constructor(private customerService:CustomerService) { }

  pwChangeCustomer: FormGroup;
  
  ngOnInit(): void {
    this.pwChangeCustomer = new FormGroup({
      'oldPassword' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'cpassword': new FormControl(null, Validators.required)
    });
  }

  clearForm(){
    this.pwChangeCustomer.reset();
  }

  updatePass()
  {
    this.touchAllFields();
    let proceed=this.checkConfirmPass();
    if(proceed){
      if(this.pwChangeCustomer.valid){
        let oldpass=this.pwChangeCustomer.get('oldPassword').value;
        let pass=this.pwChangeCustomer.get('password').value;
        this.customerService.UpdatePassword(oldpass,pass).subscribe(
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
        )
      }
      else{
        console.log('invalid form');
      }
    }
  }

  checkConfirmPass(){
    if(this.pwChangeCustomer.get('password').value!=this.pwChangeCustomer.get('cpassword').value){
      return false;
    }
    else{
      return true;
    }
  }


  touchAllFields()
  {
    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwChangeCustomer.controls).forEach(field => {
      const control = this.pwChangeCustomer.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }


}
