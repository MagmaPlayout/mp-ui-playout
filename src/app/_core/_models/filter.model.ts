import {FilterArgsModel} from './filterArgs.model';

export interface FilterModel{
    id : number;
    name : string;
    description : string;
    filterArgsList : Array<FilterArgsModel>;
}