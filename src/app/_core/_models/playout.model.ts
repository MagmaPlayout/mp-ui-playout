import {PieceModel} from './piece.model';
export class PlayoutModel{
    piece : PieceModel; 
    currentPos : number;
    oldPos : number;
    newPos : number; // TO-DO elimnar newPos desde el mp-core
}