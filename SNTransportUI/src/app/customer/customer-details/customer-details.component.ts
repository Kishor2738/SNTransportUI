import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private customerService:CustomerService) { }

  pwCustomerDetails: FormGroup;
  
  ngOnInit(): void {
    this.pwCustomerDetails = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'number' : new FormControl(null, Validators.required),
      'mail': new FormControl(null, Validators.required)
    });

    this.SetInitialValue();
  }

  TouchAllFields()
  {
    Object.keys(this.pwCustomerDetails.controls).forEach(field => {
      const control = this.pwCustomerDetails.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  SetInitialValue()
  {
    let userDetails=JSON.parse(sessionStorage.getItem("userDetails"));

    this.pwCustomerDetails.patchValue({
      name: userDetails.CPName,
      number: userDetails.CPNumber,
      mail:userDetails.CPMail
    });
  }

  clearForm(){
    this.pwCustomerDetails.reset();
    this.SetInitialValue();
  }

  updateDetails(){
    this.TouchAllFields();
    if(this.pwCustomerDetails.valid){
      let formData = {
        CPName:this.pwCustomerDetails.get('name').value,
        CPNumber:this.pwCustomerDetails.get('number').value,
        CPMail:this.pwCustomerDetails.get('mail').value
      }

      this.customerService.UpdatePersonalDetails(formData).subscribe({
        next:(res)=>{
          sessionStorage.setItem('userDetails', JSON.stringify(res));
          swal.fire({
            text: "Personal Details Updated Successfully.",
            icon: "success",
          });
          this.clearForm();
        },
        error:(res)=>{}
      });
    }
  }





}
