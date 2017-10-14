import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasComponent } from './medias.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule
  ],
  declarations: [MediasComponent]
})
export class MediasModule { }
