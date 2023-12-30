import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TrackOrderComponent } from './track-order/track-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UpdateTransitComponent } from './update-transit/update-transit.component';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { OrderProgressComponent } from './order-progress/order-progress.component';

@NgModule({
  declarations: [
    TrackOrderComponent,
    UpdateTransitComponent,
    OrderProgressComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule
  ],
  exports:[
    TrackOrderComponent,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [DatePipe]
})
export class SharedModule { }
