import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router) { }

  adminloginform:FormGroup
  
  ngOnInit(): void {
  
    this.adminloginform = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    });
  }

  login(){
    this.touchAllFields();    
    if(this.adminloginform.valid){
      let user=this.adminloginform.get('username').value;
      let pass=this.adminloginform.get('password').value;

      this.adminService.VerifyLogin(user,pass).subscribe(
        {
          next:(res)=>{
            if(res.Code==401||res.Code==404){
              swal.fire({
                //title: "Good job!",
                text: res.Message,
                icon: "error",
              });
            }
            else{
              sessionStorage.setItem('userDetails', JSON.stringify(res));   // if it's object
              sessionStorage.setItem('userId', res.AdminUserId);
              //this.router.navigate(['/homepage']);
              this.router.navigate(['/admin']);
            }  
          },
          error:()=>console.log('Error')
        }
      )
    }
  }

  touchAllFields()
  {
     /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.adminloginform.controls).forEach(field => {
      const control = this.adminloginform.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  clearForm(){
    this.adminloginform.reset();
  }


}
