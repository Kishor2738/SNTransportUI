import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  opened=true;
  userDetails=JSON.parse(sessionStorage.getItem("userDetails"));


  constructor(private router:Router) { }

  ngOnInit(): void {
    //console.log(this.userDetails);
    this.router.navigate(['/enterprise',{outlets:{'enterpriseHome':['dashboard']}}]);
  }

  

  logOut(){
    sessionStorage.removeItem('userDetails'); 
    this.router.navigate(['/home']);
  }
  

}
