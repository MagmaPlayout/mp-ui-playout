import {MediaModel} from './media.model'
export class PlayoutModel{
    media : MediaModel;
    currentPos : number;
    oldPos : number;
    newPos : number; // TO-DO elimnar newPos desde el mp-core
}