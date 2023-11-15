import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Appsettings } from 'src/app/appsettings';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  
  partner:boolean=true;
  enterprise:boolean=false;
  
  constructor(private appService:AppService,private appSettings:Appsettings,
    private homeService:HomeService,private router:Router,private dialogRef: MatDialogRef<SignInComponent>) { }

  loginform:FormGroup;

  ngOnInit(): void {
    
    this.loginform = new FormGroup({
      'email' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    });

    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
    Object.keys(this.loginform.controls).forEach(field => {
      const control = this.loginform.get(field);
      control.markAsTouched({ onlySelf: true });
     });

  }


  setActive(data){
    this.partner=this.enterprise=false;
    switch(data){
      case 1: this.partner=true;
      break;
      case 2: this.enterprise=true;
      break;
    }
  }

  login(){
    if(this.loginform.valid){
      let email=this.loginform.get('email').value;
      let pass=this.loginform.get('password').value;
      let url;
      if(this.partner){
        url=this.appSettings.API_ENDPOINT+'/api/Partner/VerifyLogin';
      }
      else{
        url=this.appSettings.API_ENDPOINT+'/api/Customer/VerifyLogin';
      }
      this.homeService.VerifyLogin(url,email,pass).subscribe(
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
            this.closeDialog();
            if(this.partner){
              sessionStorage.setItem('userId', res.PartnerId);
              this.router.navigate(['/partner']);
            }
            else{
              sessionStorage.setItem('userId', res.CustomerId);
              this.router.navigate(['/enterprise']);
            }
          }
        },
        error:()=>{console.log('error')}
        }
      );
    }
    else{
      console.log('get out');
    }
  }

  forgotPass(){
    console.log('Forgot Pass');
  }

  sendToRegister(){
    let type=2;
    if(this.enterprise==true){
      type=3;
    }
    this.appService._signUpType.next(type);
    //console.log('sendToRegister');
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
