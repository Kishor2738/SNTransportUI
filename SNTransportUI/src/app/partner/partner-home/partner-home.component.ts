import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner-home',
  templateUrl: './partner-home.component.html',
  styleUrls: ['./partner-home.component.css']
})
export class PartnerHomeComponent implements OnInit {

  opened=true;
  userDetails=JSON.parse(sessionStorage.getItem("userDetails"));


  constructor(private router:Router) { }

  ngOnInit(): void {
    //console.log(this.userDetails);
    this.router.navigate(['/partner',{outlets:{'partnerHome':['dashboard']}}]);
  }

  

  logOut(){
    sessionStorage.removeItem('userDetails'); 
    //this.router.navigate('../');
    this.router.navigate(['/home']);
  }

}
