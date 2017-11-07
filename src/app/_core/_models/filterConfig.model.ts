import {FilterArgModel} from './filterArg.model';
import {FilterModel} from './filter.model';
import {PieceModel} from './piece.model';

export interface FilterConfigModel{
    id : number;
    pieceId : number;
    filterId : number;
    filterArgId : number;
    value : string;
    filterIndex : number;
    filter : FilterModel;
    piece : PieceModel;
    filterArg : FilterArgModel;
}