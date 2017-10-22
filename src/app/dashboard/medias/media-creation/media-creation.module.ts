import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCreationComponent } from './media-creation.component';
import { FormsModule } from '@angular/forms';
import {MediaTagModule} from '../media-tag/media-tag.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MediaTagModule
  ],
  exports: [
      MediaCreationComponent
  ],
  declarations: [MediaCreationComponent]
})
export class MediaCreationModule { }
