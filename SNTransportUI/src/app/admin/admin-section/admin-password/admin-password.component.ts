import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import swal from 'sweetalert2'; 
import {AdminSectionService} from '../admin-section.service';


@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit {

  constructor(private adminSectionService:AdminSectionService) { }

  pwAdminPass: FormGroup;

  ngOnInit(): void {
    this.pwAdminPass= new FormGroup({
      'oldPassword': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'cpassword': new FormControl(null, Validators.required)
    });
  }

  clearForm(){
    this.pwAdminPass.reset();
  }

  touchAllFields()
  {
    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwAdminPass.controls).forEach(field => {
      const control = this.pwAdminPass.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  updatePass()
  {
    this.touchAllFields();
    let proceed=this.checkConfirmPass();
    if(proceed){
      if(this.pwAdminPass.valid){
        
        let formData={
          OldPassword:this.pwAdminPass.get('oldPassword').value,
          NewPassword:this.pwAdminPass.get('password').value
        }

        this.adminSectionService.UpdatePassword(formData).subscribe(
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
    if(this.pwAdminPass.get('password').value!=this.pwAdminPass.get('cpassword').value){
      return false;
    }
    else{
      return true;
    }
  }

}
