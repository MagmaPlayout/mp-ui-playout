import { UserActionModel } from './userAction.model'
export interface UserModel{
    id : number;
    name : string;
    surname : string;
    email : string;
    phone : string;
    idRole : number;
    ActionList : Array<UserActionModel>
}