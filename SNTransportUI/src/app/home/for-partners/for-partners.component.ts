import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-for-partners',
  templateUrl: './for-partners.component.html',
  styleUrls: ['./for-partners.component.css']
})
export class ForPartnersComponent implements OnInit {

  constructor(private homeService:HomeService,private router:Router) { }

  partnerform:FormGroup;


  ngOnInit(): void {
    this.partnerform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'mail' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'cpassword': new FormControl(null, Validators.required)
    });

    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
    Object.keys(this.partnerform.controls).forEach(field => {
      const control = this.partnerform.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }


  clearForm(){
    this.partnerform.reset();

    Object.keys(this.partnerform.controls).forEach(field => {
      const control = this.partnerform.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  register(){
    let proceed=this.checkConfirmPass();
    if(proceed){
      if(this.partnerform.valid){
        let name=this.partnerform.get('name').value;
        let phone=this.partnerform.get('phone').value;
        let email=this.partnerform.get('mail').value;
        let pass=this.partnerform.get('password').value;
        this.homeService.AddPartner(name,phone,email,pass).subscribe(
          res=>{
            if(res.Code==401||res.Code==404||res.Code==409){
              swal.fire({
                //title: "Good job!",
                text: res.Message,
                icon: "error",
              });
            }
            else{
              sessionStorage.setItem('userId', res.PartnerId);
              sessionStorage.setItem('userDetails', JSON.stringify(res));
              this.router.navigate(['/partner']);
            }
          }
        );
      }
      else{
        console.log('get out');
      }
    }
  }

  checkConfirmPass(){
    if(this.partnerform.get('password').value!=this.partnerform.get('cpassword').value){
      return false;
    }
    else{
      return true;
    }
  }

}
