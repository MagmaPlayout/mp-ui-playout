import { Component, OnInit, ViewChild } from '@angular/core';
import {CalendarComponent} from "ap-angular2-fullcalendar";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  
  calendarOptions:Object = {
        //height: 'parent',
        defaultView: 'agendaDay',
        fixedWeekCount : false,
        defaultDate: '2017-06-25',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
          {
            title: 'All Day Event',
            start: '2017-06-25'
          },
          {
            title: 'Long Event',
            start: '2017-06-25',
            end: '2017-06-26'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2017-06-25T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2017-06-25T16:00:00'
          },
          {
            title: 'Conference',
            start: '2017-06-25',
            end: '2017-06-27'
          },
          {
            title: 'Meeting',
            start: '2017-06-25T10:30:00',
            end: '2017-06-25T12:30:00'
          }
          
        ]
      };

  constructor() { }

  ngOnInit() {
   
  }

    changeCalendarView(view) {
   
  }

}
