import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import swal from 'sweetalert2'; 
import { AdminSectionService } from '../admin-section.service';
import { Appsettings } from '../../../appsettings';
import { AppService } from '../../../app.service';


@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.css']
})
export class UploadInvoiceComponent implements OnInit {

  invoiceDocPic:string;
  deliveryChalanDocPic:string;
  defaultImagePath="../assets/images/image_notuploaded.png";
  pwInvoice: FormGroup;
  showDetails:boolean=false;
  
  constructor(private adminSectionService:AdminSectionService,private appSettings:Appsettings) { }

  ngOnInit(): void {
    this.pwInvoice=new FormGroup({
      'invoiceNo':new FormControl(null,Validators.required)
    });
  }

  touchAllFields()
  {
     /* This will mark the elements as touched when the person clicks the button, 
     which will trigger the logic used to show error messages and styles on inputs */
     Object.keys(this.pwInvoice.controls).forEach(field => {
      const control = this.pwInvoice.get(field);
      control.markAsTouched({ onlySelf: true });
     });
  }

  GetDetais(){
    this.touchAllFields();
    this.showDetails=false; //If invoice no changes

    if(this.pwInvoice.valid){
      let formData={
        InvoiceNo:this.pwInvoice.get('invoiceNo').value
      }

      this.adminSectionService.GetOrderByInvoice(formData).subscribe({
        next:(res)=>{
          if (res) {
            this.showDetails=true;
            this.invoiceDocPic = !res.InvoiceDoc ? this.defaultImagePath :this.appSettings.API_ENDPOINT_Docs+res.InvoiceDoc;
            this.deliveryChalanDocPic = !res.DeliveryChalanDoc ? this.defaultImagePath :this.appSettings.API_ENDPOINT_Docs+res.DeliveryChalanDoc;
          }
          else{
            swal.fire({
              text: "Invoice details not found.Please try again.",
              icon: "error",
            });
          }
        }
      });
    }
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
    formData.append('invoice',this.pwInvoice.get('invoiceNo').value);

    this.adminSectionService.UpdateOrderDoc(formData).subscribe({
      next:(res)=>{
        this.SetImage(type,res.Message);
      },
      error:()=>console.log('Error')
    });
    
  }

  SetImage(Type,Path)
  {
    Path=this.appSettings.API_ENDPOINT_Docs+Path;
    switch(Type){
      case 'invoice':this.invoiceDocPic=Path;
      break;
      case 'delivery':this.deliveryChalanDocPic=Path;
      break;
    }
    swal.fire({
      text: "File uploaded successfully.",
      icon: "success"
    });
  }



}
