import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler.component';
import {PieceListModule} from '../shared/piece-list/piece-list.module';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications-lite';

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@NgModule({
  imports: [
    CommonModule,
    PieceListModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    SchedulerComponent
  
  ],
  providers:[
    NotificationsService
  ]
})
export class SchedulerModule { }
