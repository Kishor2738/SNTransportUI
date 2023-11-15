import { Component, OnInit , ViewChild} from '@angular/core';
import { AdminSectionService } from '../admin-section.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.css']
})
export class EstimatesComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'PhoneNumber', 'PickUp_Address', 'Destination_Address','Action'];
  public estimates:any=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminSectionService:AdminSectionService) { }

  ngOnInit(): void {
    this.GetNewEstimates();
  }


  GetNewEstimates()
  {
    this.adminSectionService.GetNewEstimates().subscribe({
      next:(res)=>{
        //this.estimates=res;
        this.estimates=new MatTableDataSource(res);
        
        this.estimates.paginator = this.paginator;
        this.estimates.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.estimates.filter = filterValue.trim().toLowerCase();

    if (this.estimates.paginator) {
      this.estimates.paginator.firstPage();
    }
  }

  deleteEstimate(row)
  {
    let formData={
      EstimateId:row.EstimatesId
    }
    this.adminSectionService.DeleteEstimate(formData).subscribe({
      next:(res)=>{
        swal.fire({
          text: res.Message,
          icon: "success",
        }).then((res)=>{
          this.GetNewEstimates();
        });
      }
    });
  }

}
