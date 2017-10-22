import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTagComponent } from './media-tag.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
     FormsModule
  ],
  exports : [MediaTagComponent],
  declarations: [MediaTagComponent]
})
export class MediaTagModule { }
