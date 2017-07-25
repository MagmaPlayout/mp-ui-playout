import { Component, OnInit, AfterViewInit, ElementRef,} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { OccurrenceService } from '../../_core/_services/occurrence.service';
import { CoreService } from '../../_core/_services/core.service';
import { OccurrenceModel } from '../../_core/_models/occurrence.model';
declare var jQuery: any;
declare var moment: any;
import 'fullcalendar';
import {Options} from "fullcalendar";
import {NotificationsService } from 'angular2-notifications-lite';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements AfterViewInit{
  
  private occurenceList : Array<OccurrenceModel>;
  private calendarElementId : string = "#calendar";
  
  /**Provisorio -> Las notificaciones pasan al "alert.service.ts" */
  public options = {
    position: ["button", "right"],
    timeOut: 5000,
    lastOnBottom: false
    
  }

  calendarOptions : Options = {
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaWeek,agendaDay'
			},
      defaultView: 'agendaWeek',
      slotDuration : config.scheduler.slotDuration,
			editable: true,
      dropAccept:".mp-item-media",
			droppable: true, // this allows things to be dropped onto the calendar
			drop: this.dropEvent.bind(this)
			
      
  };

  constructor(private element:ElementRef,  
              private occurrenceService: OccurrenceService, 
              private _notification: NotificationsService,
              private coreService : CoreService) {

    this.occurrenceService.getAll().subscribe( resp  => {
			
			this.occurenceList = resp;

      this.occurenceList.forEach(occ => {
        jQuery(this.calendarElementId).fullCalendar( "renderEvent", {
            title: occ.piece.name,
            start: occ.startDateTime,
            end: this.getEndTime(occ.startDateTime, occ.piece.duration),
            occurrence: occ
          });
      });
  
    });

  }
 

  ngAfterViewInit(){
      
    jQuery(this.calendarElementId).fullCalendar( this.calendarOptions);
    
  }

  /**
   * click btnSave event
   */
  private onClickBtnSave(){
    this.saveChanges().subscribe(
          value => this._notification.info(
                  'Info',
                  value.toString()
          ),
          error =>  this._notification.error(
                  'Error',
                  'Error'
          ),
          () => this._notification.success(
                  'Success',
                  'Changes have been saved successfully'
          )
      );

  }

  /**
   * Drop external event
   */
  private dropEvent(date, jsEvent, ui, resourceId){

    var piece = jQuery(ui.helper).data("pieceData").piece;
    
    let occurrence = <OccurrenceModel>{
      playlistId: null,
      startDateTime: date._d,
      pieceId: piece.id,
      piece : piece,
      filterId: null  

    };

   jQuery(this.calendarElementId).fullCalendar( 'renderEvent', {
      title: piece.name,
      start: date,
      end: this.getEndTime(date._d,piece.duration),
      occurrence: occurrence
    }); 
  }

  /**
   * resolve end time
   */
  private getEndTime(startDateTime : Date, duration : string){
    
    let end = new Date(startDateTime);
    end.setMilliseconds(moment.duration(duration, moment.ISO_8601))

    return end.toISOString();
  }

  /**
   * Save events/occurrences
   */
   private saveChanges(){

      return new Observable(observer => {
          let cant : number = 0;
          
          let events = jQuery(this.calendarElementId).fullCalendar('clientEvents');
       
          let newEvents = events.filter((item) =>{if(item.occurrence.id == null) return item})
        
          if(newEvents.length > 0 ){

            newEvents.forEach(event => {
              this.occurrenceService.insert(event.occurrence).subscribe( newOccurrence  => { 
                cant++;
                event.occurrence.id = newOccurrence.id;

                if(newEvents.length == cant ){
                   jQuery(this.calendarElementId).fullCalendar('rerenderEvents'); 
                   this.coreService.calChange(); // aviso al core-api que hubo cambios en las occurrences
                   observer.complete();
                }
                  
              });
            });
          }
          else{
            observer.next("Nothing for save");
          }
               
      });      
     
   }
}
