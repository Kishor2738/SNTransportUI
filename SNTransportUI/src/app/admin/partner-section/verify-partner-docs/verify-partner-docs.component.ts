import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PartnerSectionService } from '../partner-section.service';
import { PartnerService } from '../../../partner/partner.service';
import { Appsettings } from '../../../appsettings';
import swal from 'sweetalert2';

@Component({
  selector: 'app-verify-partner-docs',
  templateUrl: './verify-partner-docs.component.html',
  styleUrls: ['./verify-partner-docs.component.css']
})
export class VerifyPartnerDocsComponent implements OnInit {

  selfPic:any;
  aadharFrontPic:any;
  aadharBackPic:any;
  rcPic:any;
  drPic:any;
  vehicleFrontPic:any;
  vehicleBackPic:any;
  defaultImagePath="../assets/images/image_notuploaded.png";
  response:any;
  
  constructor(private _router:Router,private _partnerService:PartnerService,private appSettings:Appsettings,
    private _activatedRoute: ActivatedRoute,private _partnerSectionService:PartnerSectionService) { }

  public _PartnerId:any;
  
  ngOnInit(): void {
    this._PartnerId=this._activatedRoute.snapshot.paramMap.get('id');
    this.GetPartnerDocumets(this._PartnerId);
  }

  cancel(){
    this._router.navigate(['/admin',{outlets:{'adminHome':['verifyPartner']}}]);
  }

  GetPartnerDocumets(PartnerId){
    this._partnerService.GetUploadedDocuments(PartnerId).subscribe({
      next:(res)=>{
        this.response=res;
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

  UpdateDoc(Status,Type){
    let formData={
      PartnerId:this._PartnerId,
      Type:Type,
      Status:Status
    }

    this._partnerSectionService.UpdatePartnerDoc(formData).subscribe({
      next:(res)=>{
        this.GetPartnerDocumets(this._PartnerId);
      }
    });

  }

}
