import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler.component';
import {PieceListModule} from '../shared/piece-list/piece-list.module';
import {EventModalModule} from './modal/event-modal.module';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications-lite';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@NgModule({
  imports: [
    CommonModule,
    PieceListModule,
    EventModalModule,
    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot()

  ],
  declarations: [
    SchedulerComponent,
    
  
  ],
  providers:[
    NotificationsService
  ]
})
export class SchedulerModule { }
