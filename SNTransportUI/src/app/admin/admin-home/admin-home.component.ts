import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  opened=true;
  userDetails=JSON.parse(sessionStorage.getItem("userDetails"));
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['admin',{outlets:{'adminHome':['dashboard']}}]);
  }

  logOut(){
    sessionStorage.removeItem('userDetails'); 
    this.router.navigate(['/home']);
  }

}
