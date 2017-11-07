import {FilterArgModel} from './filterArg.model';

export interface FilterModel{
    id : number;
    name : string;
    description : string;
    filterArgsList : Array<FilterArgModel>;
}