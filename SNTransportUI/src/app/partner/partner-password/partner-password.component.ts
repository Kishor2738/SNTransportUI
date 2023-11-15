import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { PartnerService } from '../partner.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-partner-password',
  templateUrl: './partner-password.component.html',
  styleUrls: ['./partner-password.component.css']
})
export class PartnerPasswordComponent implements OnInit {

  constructor(private partnerService:PartnerService) { }

  pwChangePartner: FormGroup;
  
  ngOnInit(): void {
    this.pwChangePartner = new FormGroup({
      'oldPassword' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'cpassword': new FormControl(null, Validators.required)
    });

  }

  get pwChangePartnerControls(): any {
    return this.pwChangePartner['controls'];
  }

  clearForm(){
    this.pwChangePartner.reset();
  }

  updatePass()
  {
    this.touchAllFields();
    let proceed=this.checkConfirmPass();
    if(proceed){
      if(this.pwChangePartner.valid){
        let oldpass=this.pwChangePartner.get('oldPassword').value;
        let pass=this.pwChangePartner.get('password').value;
        this.partnerService.UpdatePassword(oldpass,pass).subscribe(
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
    if(this.pwChangePartner.get('password').value!=this.pwChangePartner.get('cpassword').value){
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
     Object.keys(this.pwChangePartner.controls).forEach(field => {
      const control = this.pwChangePartner.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

}

