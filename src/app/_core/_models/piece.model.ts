import {MediaModel} from './media.model';
import {SketchModel} from './sketch.model';
import {TagModel} from './tag.model';
import {FilterModel} from './filter.model';
import {FilterConfigModel} from './filterConfig.model';

export interface PieceModel{
    id : number;
    name: string;
    path : string;
    resolution : string;
    frameRate: number;
    frameCount : number;
    duration : string,
    mediaId : number;
    media : MediaModel;
    sketch : SketchModel;
    tagList : Array<TagModel>;
    filterConfigList : Array<FilterConfigModel>;
     
}