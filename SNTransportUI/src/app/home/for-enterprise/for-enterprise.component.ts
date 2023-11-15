import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-for-enterprise',
  templateUrl: './for-enterprise.component.html',
  styleUrls: ['./for-enterprise.component.css']
})
export class ForEnterpriseComponent implements OnInit {

  TripList: any = ['Less than 10','11 to 30','More than 30'];
  constructor(private homeService:HomeService,private router:Router) {}

   enterpriseform:FormGroup;

  ngOnInit(): void {
    this.enterpriseform = new FormGroup({
      'compname' : new FormControl(null, Validators.required),
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'mail' : new FormControl(null, Validators.required),
      'trips' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'cpassword': new FormControl(null, Validators.required)
    });

    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
    Object.keys(this.enterpriseform.controls).forEach(field => {
      const control = this.enterpriseform.get(field);
      control.markAsTouched({ onlySelf: true });
     });

  }

  changeTrips(e: any) {
    this.enterpriseform.controls['trips']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  clearForm(){
    this.enterpriseform.reset();

    Object.keys(this.enterpriseform.controls).forEach(field => {
      const control = this.enterpriseform.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  register(){
    let proceed=this.checkConfirmPass();
    if(proceed){
      if(this.enterpriseform.valid){
        let company=this.enterpriseform.get('compname').value;
        let cpname=this.enterpriseform.get('name').value;
        let cpphone=this.enterpriseform.get('phone').value;
        let trips=this.enterpriseform.get('trips').value;
        let email=this.enterpriseform.get('mail').value;
        let pass=this.enterpriseform.get('password').value;
        this.homeService.AddCustomer(company,cpname,cpphone,trips,email,pass).subscribe(
          res=>{
            if(res.Code==401||res.Code==404||res.Code==409){
              swal.fire({
                //title: "Good job!",
                text: res.Message,
                icon: "error",
              });
            }
            else{
              sessionStorage.setItem('userId', res.CustomerId);
              sessionStorage.setItem('userDetails', JSON.stringify(res));
              this.router.navigate(['/enterprise']);
            }
          }
        );
      }
      else{
        console.log('invalid form');
      }
    }
  }

  checkConfirmPass(){
    if(this.enterpriseform.get('password').value!=this.enterpriseform.get('cpassword').value){
      return false;
    }
    else{
      return true;
    }
  }

}
