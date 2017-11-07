import { Observable } from 'rxjs/Observable';
import { OccurrenceService } from '../../_core/_services/occurrence.service';
import { CoreService } from '../../_core/_services/core.service';
import { OccurrenceModel } from '../../_core/_models/occurrence.model';
import { OccurrenceOperationModel, ChangeTypeEnum } from '../../_core/_models/occurrence.operation.model';

declare var jQuery: any;
declare var moment: any;

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
export class SchedulerManager {

    private occurrenceOperationList: Array<OccurrenceOperationModel> = new Array<OccurrenceOperationModel>();
    private occurenceList: Array<OccurrenceModel>;

    constructor(private occurrenceService: OccurrenceService,        
        public coreService: CoreService
        
    ) {

    }

    /**
     * set occurrenceList
     */
    setOccurrenceList(occList : Array<OccurrenceModel>) : void {

        this.occurenceList = occList;

    }

    /**
   * Checkea por espacio disponible entre un rango de tiempo
   */
    public isTimeAvailable(startTime, endTime, event = null, eventLst: Array<any>) {

        let eventsOverlap = [];

        if (event != null)
            //eventList without it
            eventLst = eventLst.filter((item) => {
                if (item._id != event._id) {
                    return item;
                }

            });

        eventsOverlap = eventLst.filter((item) => {
            if (item.start._d <= startTime._d && item.end._d >= startTime._d
                || item.start._d <= endTime._d && item.end._d >= endTime._d
            ) {
                console.log("conflicto");
                return true;
            }

        });

        return eventsOverlap.length == 0 ? true : false;

    }

    /**
   * resolve end time
   * @param {string} date string format : ISO_8601
   */
    public resolveDuration(date, duration: string, isEnd: boolean = true) {

        let dateResult = new Date(date);
        dateResult.setMilliseconds((isEnd ? 1 : -1) * moment.duration(duration, moment.ISO_8601)._milliseconds)
        return jQuery.fullCalendar.moment.utc(dateResult.toISOString());
    }


    /**
     * Resolve OverLap
     */
    public resolveOverlap(event: any, eventLst: Array<any>) {
        return new Observable(observer => {
            if (!this.isTimeAvailable(event.start, event.end, event, eventLst)) {
                let startAux, endAux = null;

                //eventList without it
                eventLst = eventLst.filter((item) => {
                    if (item._id != event._id) {
                        return item;
                    }
                });

                for (let element of eventLst) {
                    if (element.start._d <= event.start._d
                        && element.end._d >= event.start._d
                    ) {
                        //si esta mas cerca del inicio
                        if (event.start._d - element.start._d <= element.end._d - event.start._d) {

                            endAux = moment(element.start);
                            endAux.add(-16, 'milliseconds');
                            startAux = this.resolveDuration(endAux, event.occurrence.piece.duration, false);


                        }
                        //sino esta mas cerca del final
                        else {
                            startAux = moment(element.end);
                            startAux.add(16, 'milliseconds');
                            endAux = this.resolveDuration(startAux, event.occurrence.piece.duration);
                        }
                        console.log(startAux);
                        console.log(endAux);

                        //si en el lugar movido hay espacio, cambio el evento.
                        //sino informo que no hay espacio suficiente.
                        if (this.isTimeAvailable(startAux, endAux, event, eventLst)) {
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
  * Add a change to the occurrence changes list
  */
    public addChanges(eventId: number, occ: OccurrenceModel, changeType: ChangeTypeEnum, ) {

        let isNew = true;
        let occOp: OccurrenceOperationModel = <OccurrenceOperationModel>{
            occurrence: occ,
            eventId: eventId,
            changeType: changeType,
        };

        for (let item of this.occurrenceOperationList) {

            if (item.eventId == occOp.eventId) {
                isNew = false;

                if (item.occurrence.id == null && changeType == ChangeTypeEnum.Update) {
                    item.changeType = ChangeTypeEnum.Insert;
                }

                else if (item.occurrence.id == null && changeType == ChangeTypeEnum.Delete) {
                    item.changeType = null;
                }

                else {
                    item.occurrence = occOp.occurrence;
                    item.changeType = occOp.changeType;
                }
            }
        }
        /** Elimino los delete que nunca fueron insertados */
        this.occurrenceOperationList = this.occurrenceOperationList.filter((item) => {
            return item.changeType != null;
        })

        if (isNew)
            this.occurrenceOperationList.push(occOp);


    }

    /**
     * Save events/occurrences changes
     */
    public saveChanges() {

        return new Observable(observer => {
            let cant: number = 0;
            console.log(this.occurrenceOperationList);
            if (this.occurrenceOperationList.length > 0) {

                this.occurrenceOperationList.forEach(occEvent => {
                    switch (occEvent.changeType) {

                        case ChangeTypeEnum.Insert:
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
                        case ChangeTypeEnum.Delete:
                            console.log("pase por delete");
                            this.occurrenceService.delete(occEvent.occurrence).subscribe(result => {

                            });
                            break;

                    }

                    cant++;

                    if (this.occurrenceOperationList.length == cant) {
                        this.coreService.calChange(); // aviso al core-api que hubo cambios en las occurrences
                        observer.complete();
                    }

                });
                this.occurrenceOperationList = [];
            }
            else {
                observer.next("Nothing for save");
            }

        });

    }

}
