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
  private occurenceListUpdated : Array<OccurrenceModel>;
  private occurenceListCreated : Array<OccurrenceModel>;
  private occurenceListDeleted : Array<OccurrenceModel>;
  

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
			drop: this.dropEvent.bind(this),
      eventDrop: (event, delta) => {
        
        console.log(event);
        console.log(delta);
        if (this.checkFreeTime(event.start, event.end)) {
          this.resolveOverlap(event).subscribe(
            value => this._notification.info(
              'Info',
              value.toString()
            ),
            error => this._notification.error(
              'Error',
              'Error'
            ),
            () => console.log("bien")
          );

        }
        
      }
			
      
  };

  constructor(private element: ElementRef,
    private occurrenceService: OccurrenceService,
    private _notification: NotificationsService,
    private coreService: CoreService) {

    this.occurrenceService.getAll().subscribe(resp => {

      this.occurenceList = resp;

      this.occurenceList.forEach(occ => {
        jQuery(this.calendarElementId).fullCalendar("renderEvent", {
          title: occ.piece.name,
          start: occ.startDateTime,
          end: this.resolveDuration(occ.startDateTime, occ.piece.duration),
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

    let event : any = {
      title: piece.name,
      start: date,
      end: this.resolveDuration(date._d,piece.duration),
      occurrence: occurrence
    };

    this.resolveOverlap(event).subscribe(
          value => this._notification.info(
                  'Info',
                  value.toString()
          ),
          error =>  this._notification.error(
                  'Error',
                  'Error'
          ),      
          () =>  jQuery(this.calendarElementId).fullCalendar( 'renderEvent', event) 
      );


  }

  /**
   * resolve end time
   * @param {string} date string format : ISO_8601
   */
  private resolveDuration(date, duration : string, isEnd : boolean = true){
    
    let dateResult = new Date(date);
   
    //console.log( (isEnd ? 1 : -1) * moment.duration(duration, moment.ISO_8601)._milliseconds);
    dateResult.setMilliseconds( (isEnd ? 1 : -1) * moment.duration(duration, moment.ISO_8601)._milliseconds)
    
    return jQuery.fullCalendar.moment.utc(dateResult.toISOString());
  }

  /**
   * Resolve OverLap
   */
  private resolveOverlap(event){
    return new Observable(observer => {
      let events = jQuery(this.calendarElementId).fullCalendar('clientEvents');
      let startAux, endAux = null;
      let isOverlap : boolean = false;
      
      events.forEach(element => {
        if(element.start._d <= event.start._d
          && element.end._d >= event.start._d 
        ){
          //si esta mas cerca del inicio
          if(event.start._d - element.start._d  <= element.end._d - event.start._d){

            endAux = moment(element.start);
            endAux.add(-1000, 'milliseconds');
            startAux = this.resolveDuration(endAux,event.occurrence.piece.duration,false);
          
            
          } 
          //sino esta mas cerca del final
          else{
            startAux = moment( element.end);
            startAux.add(1000, 'milliseconds');
            endAux = this.resolveDuration(startAux,event.occurrence.piece.duration); 
          }
          
          if(this.checkFreeTime(startAux,endAux)){
            console.log("llegoo");
            event.start = startAux;
            event.end = endAux;
            event.occurrence.startDateTime = startAux;
            observer.complete();
            isOverlap = true;
            return;
          }
          else{
            observer.next("No hay suficiente espacio");
            isOverlap = true;
            return;
          }
          
        }       
      });
      if(!isOverlap)
        observer.complete();
        
    });
   
  }

  private checkFreeTime(startTime, endTime){

    let eventLst = jQuery(this.calendarElementId).fullCalendar('clientEvents');
    let eventsOverlap = [];
   console.log(startTime, endTime);
    eventsOverlap = eventLst.filter ( (event) => {
      if(event.start._d <= startTime._d && event.end._d >= startTime._d
        || event.start._d <= endTime._d && event.end._d >= endTime._d
         ){
           console.log("conflicto");
          console.log(event);
           return true;
         }
        
    });
    
    return eventsOverlap.length == 0 ? true : false;

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
