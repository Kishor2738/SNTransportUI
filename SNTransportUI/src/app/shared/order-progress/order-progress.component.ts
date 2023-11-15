import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-order-progress',
  templateUrl: './order-progress.component.html',
  styleUrls: ['./order-progress.component.css']
})
export class OrderProgressComponent implements OnInit {

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Order Placed","Waiting For PickUp","In Transit","Order Completed"];
  public orderStatus = "";
  public classType=1; //1 From UI; 0 from PopUp
  @Input() props: { classType: number; status: number; };


  constructor() { 
  }

  ngOnInit(): void {
    //console.log('A');
    switch(this.props.status){
      case 1: this.orderStatus="Order Placed";
      break;
      case 4: this.orderStatus="Waiting For PickUp";
      break;
      case 5: this.orderStatus="In Transit";
      break;
      case 6: this.orderStatus="Order Completed";
      break;
    }
  }

}
