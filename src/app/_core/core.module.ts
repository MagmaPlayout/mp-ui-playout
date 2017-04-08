import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { AlertComponent } from './_directives/alert.component';

@NgModule({
  imports: [
    CommonModule  
  ],
  exports: [AlertComponent],
  declarations: [AlertComponent]
})
export class CoreModule { }
