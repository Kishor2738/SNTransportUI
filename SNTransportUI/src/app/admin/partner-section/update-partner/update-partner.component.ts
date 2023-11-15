import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {PartnerSectionService} from '../partner-section.service';
import { AdminSectionService } from '../../admin-section/admin-section.service';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-update-partner',
  templateUrl: './update-partner.component.html',
  styleUrls: ['./update-partner.component.css']
})
export class UpdatePartnerComponent implements OnInit {

  constructor(private _partnerSectionService:PartnerSectionService,private _router:Router,
    private _activatedRoute:ActivatedRoute,private _adminSectionService:AdminSectionService) { }
  
  public _PartnerId:any;
  public _userDetails:any;
  public VehicleList:any;
  pwPartnerDetails: FormGroup;

  ngOnInit(): void {
    this.pwPartnerDetails = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'number' : new FormControl(null, Validators.required),
      'mail': new FormControl(null, Validators.required),
      'vehicle' : new FormControl(null, Validators.required)
    });

    this._PartnerId=this._activatedRoute.snapshot.paramMap.get('id')

    //this.getPartnerDetails();
    this.GetVehicleList();
  }

  SetInitialValue()
  {
    this.pwPartnerDetails.patchValue({
      name: this._userDetails.Name,
      number: this._userDetails.PhoneNumber,
      mail:this._userDetails.Email,
      vehicle:this._userDetails.VehicleTypeId 
    });
  }

  clearForm(){
    this.pwPartnerDetails.reset();
    this.SetInitialValue();
  }

  cancel(){
    this._router.navigate(['/admin',{outlets:{'adminHome':['verifyPartner']}}]);
  }

  getPartnerDetails()
  {
    this._partnerSectionService.GetPartnerDetailsById(this._PartnerId).subscribe({
      next:(res)=>{
        this._userDetails=res;
        this.SetInitialValue();
      }
    });
  }

  GetVehicleList(){
    this._adminSectionService.GetAllVehicle().subscribe((res)=>{
      this.VehicleList=res;
      this.getPartnerDetails();
    });
  }

  changeVehicle(e: any) {
    this.pwPartnerDetails.controls['vehicle']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  updateDetails(){
    if(this.pwPartnerDetails.valid && this.pwPartnerDetails.value.vehicle!=0){
      let formData={
        PartnerId:this._PartnerId,
        Name:this.pwPartnerDetails.get('name').value,
        PhoneNumber:this.pwPartnerDetails.get('number').value,
        Email:this.pwPartnerDetails.get('mail').value,
        VehicleTypeId:this.pwPartnerDetails.value.vehicle
      }
  
      this._partnerSectionService.UpdatePartnerDetails(formData).subscribe({
        next:(res)=>{
          swal.fire({
            text: res.Message,
            icon: "success",
          }).then((res)=>{
            this.cancel();
          });
        }
      });
  
    }
  }

}
