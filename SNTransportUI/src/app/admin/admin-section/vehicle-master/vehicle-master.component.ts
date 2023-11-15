import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import swal from 'sweetalert2'; 
import {AdminSectionService} from '../admin-section.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.css']
})
export class VehicleMasterComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<VehicleMasterComponent>,
  private adminSectionService:AdminSectionService) { }

  title="Add Vehicle";
  _vehicleTypeId=0;
  pwVehicleMaster: FormGroup;

  ngOnInit(): void {
    this.pwVehicleMaster= new FormGroup({
      'name': new FormControl(null, Validators.required),
      'capacity': new FormControl(null, Validators.required)
    });

    //console.log(this.vehicleData);
    if(this._vehicleTypeId != null){
      this._vehicleTypeId=this.data.data.VehicleTypeId;
      this.title="Update Vehicle";

      this.pwVehicleMaster.patchValue({
        name:this.data.data.VehicleName,
        capacity:this.data.data.VehicleCapacity
      });
    }
  }

  touchAllFields()
  {
    /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwVehicleMaster.controls).forEach(field => {
      const control = this.pwVehicleMaster.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  addVehicle(){
    this.touchAllFields();
    if(this.pwVehicleMaster.valid){
      let formData={
        VehicleName:this.pwVehicleMaster.get('name').value,
        VehicleCapacity:this.pwVehicleMaster.get('capacity').value
      }

      this.adminSectionService.AddVehicle(formData).subscribe({
        next:(res)=>{
          if(res.Code==409){
            swal.fire({
              text: res.Message,
              icon: "error",
            }).then(()=>{
              this.dialogRef.close();
            });
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

  updateVehicle(){
    this.touchAllFields();
    if(this.pwVehicleMaster.valid){
      let formData={
        VehicleTypeId:this._vehicleTypeId,
        VehicleName:this.pwVehicleMaster.get('name').value,
        VehicleCapacity:this.pwVehicleMaster.get('capacity').value
      }

      this.adminSectionService.UpdateVehicle(formData).subscribe({
        next:(res)=>{
          swal.fire({
            text: res.Message,
            icon: "success",
          }).then(()=>{
            this.dialogRef.close();
          })
        }
      });

    }
  }

  clearForm(){
    this.pwVehicleMaster.reset();
  }


}
