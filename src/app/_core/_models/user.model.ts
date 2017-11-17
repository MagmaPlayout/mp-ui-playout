import { UserActionModel } from './userAction.model';
import { RoleModel } from './role.model';

export interface UserModel{
    id : number;
    name : string;
    surname : string;
    username : string;
    password : string;
    email : string;
    phone : string;
    idRole : number;
    role : RoleModel;
    ActionList : Array<UserActionModel>
}