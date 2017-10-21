import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasComponent } from './medias.component';
import {MediaCreationModule} from './media-creation/media-creation.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MediaCreationModule
  ],
  declarations: [MediasComponent]
})
export class MediasModule { }
