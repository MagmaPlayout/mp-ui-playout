import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasComponent } from './medias.component';
import {MediaCreationModule} from './media-creation/media-creation.module'
import {PieceEditModule} from './piece-edit/piece-edit.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MediaCreationModule,
    PieceEditModule,
    NgbModule.forRoot()
  ],
  declarations: [MediasComponent]
})
export class MediasModule { }
