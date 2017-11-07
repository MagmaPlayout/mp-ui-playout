import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule  
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
