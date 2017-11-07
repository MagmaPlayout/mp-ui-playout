import {OccurrenceModel} from './occurrence.model';

export enum ChangeTypeEnum {
    Update = 1,
    Insert,
    Delete
}
export interface OccurrenceOperationModel{
    occurrence : OccurrenceModel,
    eventId : number,
    changeType :  ChangeTypeEnum
}