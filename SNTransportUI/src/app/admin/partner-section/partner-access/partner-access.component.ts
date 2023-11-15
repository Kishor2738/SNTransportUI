import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { PartnerSectionService } from '../partner-section.service';

@Component({
  selector: 'app-partner-access',
  templateUrl: './partner-access.component.html',
  styleUrls: ['./partner-access.component.css']
})
export class PartnerAccessComponent implements OnInit {

  displayedColumns: string[] = ['Name','Email', 'PhoneNumber','Actions'];
  public partnerList:any=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private partnerSectionService:PartnerSectionService) { }

  ngOnInit(): void {
    this.GetAllPartners();
  }

  GetAllPartners()
  {
    this.partnerSectionService.GetAllPartners().subscribe({
      next:(res)=>{
        this.partnerList=new MatTableDataSource(res);

        this.partnerList.paginator=this.paginator;
        this.partnerList.sort=this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.partnerList.filter = filterValue.trim().toLowerCase();

    if (this.partnerList.paginator) {
      this.partnerList.paginator.firstPage();
    }
  }

  updateAccess(row,status)
  {
    let formData={
      PartnerId:row.PartnerId,
      Status:status
    }
    this.partnerSectionService.UpdatePartnerStatus(formData).subscribe({
      next:(res)=>{
        //UpdateArray(Pa)
        row.Status=status;
      }
    });
  }

}
