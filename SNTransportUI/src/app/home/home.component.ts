import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppService } from '../app.service';
import { TrackOrderComponent } from '../shared/track-order/track-order.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home:boolean=true;
  partner:boolean=false;
  enterprise:boolean=false;
  support:boolean=false;

  constructor(private dialog:MatDialog,private appService:AppService) {
    this.appService._signUpType.subscribe(this.GetSignUpType);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    //this.appService._signUpType.unsubscribe();
  }

  setActive(data){
    this.home=this.partner=this.enterprise=this.support=false;
    switch(data){
      case 1: this.home=true;
      break;
      case 2: this.partner=true;
      break;
      case 3: this.enterprise=true;
      break;
      case 4: this.support=true;
      break;
    }
  }

  openSignIn(){
    //this.dialog.open(SignInComponent);
    this.dialog.open(SignInComponent, {
      height: '400px',
      width: '500px',
    });
  }

  openTrackOrder(){
    this.dialog.open(TrackOrderComponent,{
      height: '550px',
      width: '550px',
    });
    this.appService._TrackOrderFrom.next(0);
  }

  GetSignUpType=(data)=>{
    this.setActive(data);
    this.dialog.closeAll();
  }
  


}
