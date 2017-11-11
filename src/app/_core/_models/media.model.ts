import {ThumbnailModel} from './thumbnail.model'
export interface MediaModel{
    id : number;
    name: string;
    duration: string;
    frameRate : number;
    pathText : string;
    frameCount : number;
    description : string;
    resolution : string;  
    thumbnails : Array<ThumbnailModel>
}