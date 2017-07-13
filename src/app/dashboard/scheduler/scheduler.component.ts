import { Component, OnInit, AfterViewInit, ElementRef,} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { OccurrenceService } from '../../_core/_services/occurrence.service';
import { OccurrenceModel } from '../../_core/_models/occurrence.model';
declare var jQuery: any;
import 'fullcalendar';
import {Options} from "fullcalendar";
import {NotificationsService } from 'angular2-notifications-lite';

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
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
      dropAccept:".mp-item-media",
			droppable: true, // this allows things to be dropped onto the calendar
			drop: this.dropEvent.bind(this)
			
      
  };

  constructor(private element:ElementRef,  private occurrenceService: OccurrenceService,  private _notification: NotificationsService) {

    this.occurrenceService.getAll().subscribe( resp  => {
			
			this.occurenceList = resp;

      this.occurenceList.forEach(occ => {
        
        jQuery(this.calendarElementId).fullCalendar( "renderEvent", {
            title: occ.piece.name,
            start: occ.startDateTime,
            end: occ.startDateTime,
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
    
    var occurrence = {
      playlistId: null,
      pieceId: piece.id,
      startDateTime: date._d,
      filterId: null  

    };

   jQuery(this.calendarElementId).fullCalendar( 'renderEvent', {
      title: piece.name,
      start: date,
      end: date,
      occurrence: occurrence
    }); 
  }

  /**
   * Save events/occurrences
   */
   private saveChanges(){

      return new Observable(observer => {
          let cant : number = 0;
          
          let events = jQuery(this.calendarElementId).fullCalendar('clientEvents');
       
          let newEvents = events.filter((item) =>{if(item.occurrence.id == null) return item})
          
          console.log(jQuery(this.calendarElementId).fullCalendar('clientEvents'));

          if(newEvents.length > 0 ){

            newEvents.forEach(event => {
              this.occurrenceService.insert(event.occurrence).subscribe( newOccurrence  => { 
                cant++;
                event.occurrence.id = newOccurrence.id;

                if(newEvents.length == cant ){
                   jQuery(this.calendarElementId).fullCalendar('rerenderEvents'); 
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
