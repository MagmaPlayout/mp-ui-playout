import { Component, OnInit, AfterViewInit, ElementRef,ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { OccurrenceService } from '../../_core/_services/occurrence.service';
import { CoreService } from '../../_core/_services/core.service';
import { OccurrenceModel } from '../../_core/_models/occurrence.model';
import { EventModalComponent} from './modal/event-modal.component';
import { OccurrenceOperationModel, ChangeTypeEnum } from '../../_core/_models/occurrence.operation.model';


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
  
  @ViewChild(EventModalComponent) 
  private eventModal:EventModalComponent;
  private occurenceList : Array<OccurrenceModel>;
  private occurenceOperationList : Array<OccurrenceOperationModel> = new Array<OccurrenceOperationModel>();
  private calendarElementId : string = "#calendar";
  private eventId = 0;
  
  
  constructor(private element: ElementRef,
    private occurrenceService: OccurrenceService,
    private _notification: NotificationsService,
    private coreService: CoreService
  ) {

    this.occurrenceService.getAll().subscribe(resp => {

      this.occurenceList = resp;

      this.occurenceList.forEach(occ => {
        jQuery(this.calendarElementId).fullCalendar("renderEvent", {
          eventId: this.getEventId(),
          title: occ.piece.name,
          start: occ.startDateTime,
          end: this.resolveDuration(occ.startDateTime, occ.piece.duration),
          occurrence: occ
        });
      });

    });

  }

  private getEventId() : number{
    return this.eventId ++;
  }
  

   /**Provisorio -> Las notificaciones pasan al "alert.service.ts" */
  public options = {
    position: ["top", "left"],
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
      eventAfterRender : ( event, element, view ) => {

      },
      eventClick: (calEvent, jsEvent, view) => {      
        this.eventModal.open(calEvent.occurrence, calEvent.eventId);
      },
      eventDrop: (event, delta, revertFunc) => {
        event.occurrence.startDateTime= event.start;
        this.resolveOverlap(event).subscribe(
          value => {
              revertFunc();
              this._notification.info(
                'Info',
                value.toString()
              );
          },
          error => this._notification.error(
            'Error',
            'Error'
          ),
          () => {
            console.log("bien");
            this.addChanges(event.eventId, event.occurrence, ChangeTypeEnum.Update);
          }
        );
      }
  };


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
      eventId : this.getEventId(),
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
          () =>  {
            this.addChanges(event.eventId, event.occurrence, ChangeTypeEnum.Insert);
            jQuery(this.calendarElementId).fullCalendar( 'renderEvent', event);
            
            
          } 
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
  private resolveOverlap(event) {
    return new Observable(observer => {
      if (!this.isTimeAvailable(event.start, event.end, event)) {
        let events = jQuery(this.calendarElementId).fullCalendar('clientEvents');
        let startAux, endAux = null;

        //eventList without it
        events = events.filter((item) =>{ 
          if(item._id != event._id){
            return item;
          }
        });

        for (let element of events) {
          if (element.start._d <= event.start._d
            && element.end._d >= event.start._d
          ) {
            //si esta mas cerca del inicio
            if (event.start._d - element.start._d <= element.end._d - event.start._d) {

              endAux = moment(element.start);
              endAux.add(-1000, 'milliseconds');
              startAux = this.resolveDuration(endAux, event.occurrence.piece.duration, false);


            }
            //sino esta mas cerca del final
            else {
              startAux = moment(element.end);
              startAux.add(1000, 'milliseconds');
              endAux = this.resolveDuration(startAux, event.occurrence.piece.duration);
            }
            console.log(startAux);
            console.log(endAux);

            //si en el lugar movido hay espacio, cambio el evento.
            //sino informo que no hay espacio suficiente.
            if (this.isTimeAvailable(startAux, endAux, event)) {
              console.log("llegoo");
              event.start = startAux;
              event.end = endAux;
              event.occurrence.startDateTime = startAux;
              observer.complete();
              break;
            }
            else {
              observer.next("There is not enough space");

              break;
            }

          }
        };

      }
      else
        observer.complete();

    });

  }

  /**
   * Checkea por espacio disponible entre un rango de tiempo
   */
  private isTimeAvailable(startTime, endTime, event = null){

    let eventLst = jQuery(this.calendarElementId).fullCalendar('clientEvents');
    let eventsOverlap = [];

    if(event != null)
      //eventList without it
      eventLst = eventLst.filter((item) =>{ 
        if(item._id != event._id){
          return item;
        }
          
      });
   
    eventsOverlap = eventLst.filter ( (item) => {
      if(item.start._d <= startTime._d && item.end._d >= startTime._d
        || item.start._d <= endTime._d && item.end._d >= endTime._d
         ){
            console.log("conflicto");
            return true;
         }
        
    });
   
    return eventsOverlap.length == 0 ? true : false;

  }


  /**
   * Add a change to the occurrence changes list
   */
  private addChanges(eventId: number, occ: OccurrenceModel, changeType: ChangeTypeEnum, ) {

    let isNew = true;
    let occOp: OccurrenceOperationModel = <OccurrenceOperationModel>{
      occurrence: occ,
      eventId: eventId,
      changeType: changeType,
    };
   
    for(let item of this.occurenceOperationList){
       
      if (item.eventId == occOp.eventId){
        isNew = false;
      
        if (item.occurrence.id == null && changeType == ChangeTypeEnum.Update) {
          item.changeType = ChangeTypeEnum.Insert;
         
        }

        else if (item.occurrence.id == null && changeType == ChangeTypeEnum.Delete){
          item.changeType = null;
          console.log("no hago nada");
        }
          
        else{
          item.occurrence = occOp.occurrence;
          item.changeType = occOp.changeType;
        }    
      }   
    }
    /** Elimino los delete que nunca fueron insertados */
    this.occurenceOperationList = this.occurenceOperationList.filter( (item) => {
      return item.changeType !=null;
    })

    if (isNew)    
      this.occurenceOperationList.push(occOp);


  }


  /**
   * Capture a modal event.
   */
  onModalOccOp(occOp : OccurrenceOperationModel){
    console.log(occOp);
    if(occOp.changeType == ChangeTypeEnum.Delete)
      jQuery(this.calendarElementId).fullCalendar('removeEvents',(event) =>{
        if(event.eventId == occOp.eventId)
          return true;
      });

    this.addChanges(occOp.eventId, occOp.occurrence, occOp.changeType);
  }

  /**
   * Save events/occurrences changes
   */
   private saveChanges(){

      return new Observable(observer => {
          let cant : number = 0;
          console.log(this.occurenceOperationList);
          if (this.occurenceOperationList.length > 0) {

            this.occurenceOperationList.forEach(occEvent => {
              switch (occEvent.changeType) {
                
                case ChangeTypeEnum.Insert :
                  console.log("pase por insert");
                  this.occurrenceService.insert(occEvent.occurrence).subscribe(newOccurrence => {                    
                    occEvent.occurrence.id = newOccurrence.id;
                  });
                  break;
                case ChangeTypeEnum.Update:
                  console.log("pase por update");
                  this.occurrenceService.update(occEvent.occurrence).subscribe(result => {                    
                    
                  });
                  break;
                case ChangeTypeEnum.Delete :
                  console.log("pase por delete");
                  this.occurrenceService.delete(occEvent.occurrence).subscribe(result => {                    
                    
                  });
                  break;

              }

              cant++;

              if (this.occurenceOperationList.length == cant) {
                jQuery(this.calendarElementId).fullCalendar('rerenderEvents');
                this.coreService.calChange(); // aviso al core-api que hubo cambios en las occurrences
                observer.complete();
              }

            });
            this.occurenceOperationList = [];
          }
          else {
            observer.next("Nothing for save");
          }
               
      });      
     
   }
}
