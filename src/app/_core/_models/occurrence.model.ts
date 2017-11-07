import {PieceModel} from './piece.model';

export interface OccurrenceModel{
    id: number,
    name: string,
    playlistId: number,
    pieceId: number,
    startDateTime: Date,
    filterId: number,
    piece : PieceModel      
}