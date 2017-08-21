import {Component, ViewEncapsulation, ViewChild, ElementRef, Output,EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { OccurrenceModel } from '../../../_core/_models/occurrence.model';
import { OccurrenceOperationModel, ChangeTypeEnum } from '../../../_core/_models/occurrence.operation.model';
import { OccurrenceService } from '../../../_core/_services/occurrence.service';


/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
  selector: 'event-modal',
  templateUrl: 'event-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})
export class EventModalComponent {

  @ViewChild('content') content: ElementRef; 
  private occ : OccurrenceModel = <OccurrenceModel>{};
  private occOp : OccurrenceOperationModel;
  private eventId : string;
  @Output() onOccurrenceOp = new EventEmitter<OccurrenceOperationModel>();
 

  constructor(private modalService: NgbModal, private occurrenceService : OccurrenceService) {}

  /**
   * Open modal with occurrence data
   * 
   * */
  public open(occ : OccurrenceModel, eventId : string) {
    console.log(eventId)
    this.occ = occ;
    this.eventId = eventId;
    this.modalService.open(this.content, { windowClass: 'dark-modal' });
  }

  /**
   * Trigger a event of update for the occurenceOperationList
   */
  private save(){
 
    this.occOp = <OccurrenceOperationModel> {
      occurrence : this.occ,
      changeType : ChangeTypeEnum.Update
    }
    this.onOccurrenceOp.emit(this.occOp);
  }

  /**
   * Trigger a event of delete for the occurenceOperationList
   */
  private delete(){
    console.log("deletee modal");
    this.occOp = <OccurrenceOperationModel> {
      occurrence : this.occ,
      eventId : this.eventId,
      changeType : ChangeTypeEnum.Delete
    }
    this.onOccurrenceOp.emit(this.occOp);
 
  }


}
