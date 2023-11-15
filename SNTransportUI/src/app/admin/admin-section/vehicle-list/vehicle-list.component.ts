import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminSectionService } from '../admin-section.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehicleMasterComponent } from '../vehicle-master/vehicle-master.component';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  displayedColumns: string[] = ['VehicleName', 'VehicleCapacity','Action'];
  public vehicleList:any=null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminSectionService:AdminSectionService,private dialog:MatDialog) { 
  }


  ngOnInit(): void {
    this.GetVehicleList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicleList.filter = filterValue.trim().toLowerCase();

    if (this.vehicleList.paginator) {
      this.vehicleList.paginator.firstPage();
    }
  }

  GetVehicleList()
  {
    this.adminSectionService.GetAllVehicle().subscribe({
      next:(res)=>{
        this.vehicleList=new MatTableDataSource(res);

        this.vehicleList.paginator=this.paginator;
        this.vehicleList.sort=this.sort;
      }
    });
  }

  addNewVehicle(){
    this.dialog.open(VehicleMasterComponent,{
      height: '450px',
      width: '450px',
    }).afterClosed().subscribe(()=>{this.GetVehicleList();});
  }

  editVehicle(row){
    this.dialog.open(VehicleMasterComponent,{
      height: '450px',
      width: '450px',
      data:{
        data:row
      }
    }).afterClosed().subscribe(()=>{this.GetVehicleList();});
  }

  deleteVehicle(row){
    let formData={
      VehicleTypeId:row.VehicleTypeId
    }
    this.adminSectionService.DeleteVehicle(formData).subscribe({
      next:(res)=>{
        swal.fire({
          text: res.Message,
          icon: "success",
        }).then((res)=>{
          this.GetVehicleList();
        });
      }
    });
  }

}
