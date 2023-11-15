import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartnerSectionService } from '../partner-section.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-partner',
  templateUrl: './verify-partner.component.html',
  styleUrls: ['./verify-partner.component.css']
})
export class VerifyPartnerComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Email', 'PhoneNumber','Vehicle', 'Actions'];
  public partnerList: any = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private partnerSectionService: PartnerSectionService,private _router:Router) { }

  ngOnInit(): void {
    this.GetAllPartners();
  }

  GetAllPartners() {
    this.partnerSectionService.GetActivePartners().subscribe({
      next: (res) => {
        this.partnerList = new MatTableDataSource(res);

        this.partnerList.paginator = this.paginator;
        this.partnerList.sort = this.sort;
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

  updateProfile(row) {
    this._router.navigate(['/admin', { outlets: { 'adminHome': ['verifyPartnerDocs', row.PartnerId] } }]);    
  }

  updateDetails(row)
  {
    this._router.navigate(['/admin',{outlets:{'adminHome':['updatePartnerDetails',row.PartnerId]}}]);
  }

}
