import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../partner.service';
import { Appsettings } from 'src/app/appsettings';
import swal from 'sweetalert2';

@Component({
  selector: 'app-partner-documents',
  templateUrl: './partner-documents.component.html',
  styleUrls: ['./partner-documents.component.css']
})
export class PartnerDocumentsComponent implements OnInit {

  selfPic:any;
  aadharFrontPic:any;
  aadharBackPic:any;
  rcPic:any;
  drPic:any;
  vehicleFrontPic:any;
  vehicleBackPic:any;
  defaultImagePath="../assets/images/image_notuploaded.png";
  
  constructor(private partnerService:PartnerService,private appSettings:Appsettings) { }

  ngOnInit(): void {
    //this.selfPic=this.aadharFrontPic=this.aadharBackPic=this.rcPic=this.drPic=
    //this.vehicleFrontPic=this.vehicleBackPic="../assets/images/image_notuploaded.png";

    this.GetDocuments();
  }


  UploadFiles(files,type){
    if (files.length === 0) {
      swal.fire({
        text: "Please choose file to upload",
        icon: "error"
      });
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('type', type);
    formData.append('partner',sessionStorage.getItem("userId"));

    this.partnerService.UploadFile(formData).subscribe({
      next:(res)=>{
        this.SetImage(type,res.Message);
      },
      error:()=>console.log('Error')
    })
    
  }

  SetImage(Type,Path)
  {
    Path=this.appSettings.API_ENDPOINT_Docs+Path;
    switch(Type){
      case 'Self':this.selfPic=Path;
      break;
      case 'aadharFront':this.aadharFrontPic=Path;
      break;
      case 'aadharBack':this.aadharBackPic=Path;
      break;
      case 'RC':this.rcPic=Path;
      break;
      case 'DR':this.drPic=Path;
      break;
      case 'vehicleFront':this.vehicleFrontPic=Path;
      break;
      case 'vehicleBack':this.vehicleBackPic=Path;
      break;
    }
    swal.fire({
      text: "File uploaded successfully.",
      icon: "success"
    });
  }

  GetDocuments()
  {
    let partnerId=sessionStorage.getItem("userId");
    this.partnerService.GetUploadedDocuments(partnerId).subscribe({
      next:(res)=>{
        this.SetInitialImage(res);
      },
      error:()=>{}
    });
  }

  SetInitialImage(res) {
    this.selfPic = res.ProfilePic != null ? this.appSettings.API_ENDPOINT_Docs+res.ProfilePic : this.defaultImagePath;
    this.aadharFrontPic = res.AadharFront != null ? this.appSettings.API_ENDPOINT_Docs+res.AadharFront : this.defaultImagePath;
    this.aadharBackPic = res.AadharBack != null ? this.appSettings.API_ENDPOINT_Docs+res.AadharBack : this.defaultImagePath;
    this.rcPic = res.RCPic != null ? this.appSettings.API_ENDPOINT_Docs+res.RCPic : this.defaultImagePath;
    this.drPic = res.DrivingPic != null ? this.appSettings.API_ENDPOINT_Docs+res.DrivingPic : this.defaultImagePath;
    this.vehicleFrontPic = res.VehicleFront != null ? this.appSettings.API_ENDPOINT_Docs+res.VehicleFront : this.defaultImagePath;
    this.vehicleBackPic = res.VehicleBack != null ? this.appSettings.API_ENDPOINT_Docs+res.VehicleBack : this.defaultImagePath;
  }

}
