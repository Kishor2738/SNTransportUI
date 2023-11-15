import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  showAlert:boolean=false;

  constructor(private homeService:HomeService) { }

  exform:FormGroup;

  ngOnInit(): void {
    
    this.exform = new FormGroup({
      'pickup' : new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'drop' : new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
        'name' : new FormControl(null,Validators.required)
    });

  }


  getEstimate(){
    //console.log(this.exform.value);
    if(this.exform.valid){
      let pickup=this.exform.get('pickup').value;
      let drop=this.exform.get('drop').value;
      let phone=this.exform.get('phone').value;
      let name=this.exform.get('name').value;

      this.homeService.AddEstimate(pickup,drop,phone,name).subscribe(
        res=>{
          this.exform.reset();
          this.showAlert=true;
        }
      );
    }
  }
  
  closedAlert(){
    this.showAlert=false;
    //console.log('Event closed');
  }

}
