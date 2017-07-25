import {MediaModel} from './media.model';
import {SketchModel} from './sketch.model';

export interface PieceModel{
    id : number;
    name: string;
    path : string;
    resolution : string;
    duration : string,
    media : MediaModel;
    sketch : SketchModel;
     
}