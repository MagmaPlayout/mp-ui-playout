import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler.component';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";

@NgModule({
  imports: [
    CommonModule   
  ],
  declarations: [
    SchedulerComponent,
    CalendarComponent
  ]
})
export class SchedulerModule { }
