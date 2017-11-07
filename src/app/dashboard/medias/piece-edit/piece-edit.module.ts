import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieceEditComponent } from './piece-edit.component';
import { FormsModule } from '@angular/forms';
import {MediaTagModule} from '../media-tag/media-tag.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MediaTagModule
  ],
  exports: [
      PieceEditComponent
  ],
  declarations: [PieceEditComponent]
})
export class PieceEditModule { }
