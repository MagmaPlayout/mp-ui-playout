import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OccurrenceService } from '../../_core/_services/occurrence.service';
import { CoreService } from '../../_core/_services/core.service';
import { OccurrenceModel } from '../../_core/_models/occurrence.model';
import { CmdModel } from '../../_core/_models/cmd.model';
import { EventModalComponent } from './modal/event-modal.component';
import { OccurrenceOperationModel, ChangeTypeEnum } from '../../_core/_models/occurrence.operation.model';
import { SchedulerManager } from './scheduler.manager'
declare var jQuery: any;
declare var moment: any;
import 'fullcalendar';
import { Options } from "fullcalendar";
import { NotificationService } from '../../_core/_services/notification.service';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild(EventModalComponent)
  private eventModal: EventModalComponent;
  private occurenceList: Array<OccurrenceModel>;
  private occurenceOperationList: Array<OccurrenceOperationModel> = new Array<OccurrenceOperationModel>();
  private calendarElementId: string = "#calendar";
  private eventId = 0;
  private schedulerManager: SchedulerManager;


  constructor(private element: ElementRef,
    private occurrenceService: OccurrenceService,
    private _notification: NotificationService,
    private coreService: CoreService) {

    this.schedulerManager = new SchedulerManager(this.occurrenceService, this.coreService);
    this.occurrenceService.getAll().subscribe(resp => {
      this.occurenceList = resp;
      var now = moment(new Date()).unix();

      this.occurenceList.forEach(occ => {
        var occEnds = moment(occ.startDateTime)
          .add(moment.duration(occ.piece.duration, moment.ISO_8601)._milliseconds, 'milliseconds')
          .unix();
        
        // Only loads the event if the ending datetime is after the current datetime
        if(occEnds > now){
          jQuery(this.calendarElementId).fullCalendar("renderEvent", {
            eventId: this.getEventId(),
            title: occ.piece.name,
            start: new Date(occ.startDateTime),
            end: this.schedulerManager.resolveDuration(occ.startDateTime, occ.piece.duration),
            occurrence: occ
          });
        }
      });

      this.schedulerManager.setOccurrenceList(this.occurenceList);
    });
  }

  private getEventId(): number {
    return this.eventId++;
  }


  /**Provisorio -> Las notificaciones pasan al "alert.service.ts" */
  public options = {
    position: ["top", "left"],
    timeOut: 5000,
    lastOnBottom: false

  }
  private currentTime = new Date().getHours() + ':' + new Date().getMinutes();

  calendarOptions = {
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'agendaWeek,agendaDay',
    },
    allDaySlot:false,
    defaultView: 'agendaDay',
    slotDuration: config.scheduler.slotDuration,
    editable: true,
    dropAccept: ".mp-item-media",
    droppable: true,
    drop: this.dropEvent.bind(this),
    timezone: 'local',
    scrollTime: this.currentTime,
    eventClick: (calEvent, jsEvent, view) => {
      this.eventModal.open(calEvent.occurrence, calEvent.eventId);
    },
    eventDrop: (event, delta, revertFunc) => {
      console.log(event);
      event.occurrence.startDateTime = event.start;
      let eventLst = jQuery(this.calendarElementId).fullCalendar('clientEvents');

      this.schedulerManager.resolveOverlap(event, eventLst).subscribe(
        value => {
          revertFunc();
          this._notification.info(value.toString());
        },
        error => this._notification.error('Error'),
        () => {
          console.log("bien");
          this.schedulerManager.addChanges(event.eventId, event.occurrence, ChangeTypeEnum.Update);
        }
      );
    }
  };


  ngAfterViewInit() {

    jQuery(this.calendarElementId).fullCalendar(this.calendarOptions);

  }

  /**
   * click btnSave event
   */
  private onClickBtnSave() {
    this.schedulerManager.saveChanges().subscribe(
      value => this._notification.info(value.toString()),
      error => this._notification.error('Error'),
      () => {
        this._notification.success('Changes have been saved successfully');
        jQuery(this.calendarElementId).fullCalendar('rerenderEvents');
      }
    );

  }

  /**
   * Drop external event
   */
  private dropEvent(date, jsEvent, ui, resourceId) {
   
    var piece = jQuery(ui.helper).data("pieceData").piece;
    console.log(piece);
    let eventLst = jQuery(this.calendarElementId).fullCalendar('clientEvents');

    let occurrence = <OccurrenceModel>{
      playlistId: null,
      startDateTime: date._d,
      pieceId: piece.id,
      piece: piece,
      filterId: null

    };

    let event: any = {
      eventId: this.getEventId(),
      title: piece.name,
      start: date,
      end: this.schedulerManager.resolveDuration(date._d, piece.duration),
      occurrence: occurrence
    };

    this.schedulerManager.resolveOverlap(event, eventLst).subscribe(
      value => this._notification.info(value.toString()),
      error => this._notification.error('Error'),
      () => {
        this.schedulerManager.addChanges(event.eventId, event.occurrence, ChangeTypeEnum.Insert);
        jQuery(this.calendarElementId).fullCalendar('renderEvent', event);

      }
    );

  }


  /**
   * Capture a modal event.
   */
  onModalOccOp(occOp: OccurrenceOperationModel) {
    console.log(occOp);
    if (occOp.changeType == ChangeTypeEnum.Delete)
      jQuery(this.calendarElementId).fullCalendar('removeEvents', (event) => {
        if (event.eventId == occOp.eventId)
          return true;
      });

    this.schedulerManager.addChanges(occOp.eventId, occOp.occurrence, occOp.changeType);
  }

  /**
	 * On click switch mode
	 */
  onClickBtnSwitchmode() {
    let cmd: CmdModel = new CmdModel();
    cmd.mode = 0; // 0 = calendar mode

    this.coreService.switchMode(cmd);
  }

}
