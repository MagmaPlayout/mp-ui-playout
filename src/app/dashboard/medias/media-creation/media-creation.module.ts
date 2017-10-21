import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCreationComponent } from './media-creation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      MediaCreationComponent
  ],
  declarations: [MediaCreationComponent]
})
export class MediaCreationModule { }
