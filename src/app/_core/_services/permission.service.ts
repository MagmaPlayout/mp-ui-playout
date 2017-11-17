import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import { HttpClient } from '../_helpers/httpClient';
import { UserActionModel } from '../_models/userAction.model';
import { RoleModel } from '../_models/role.model'

var config = require("../../app.config");

@Injectable()
export class PermissionService {
    private _userActions : Array<UserActionModel>;

    constructor(private http: HttpClient) { 
        this.http = http;
    }

    /**
     * Get current user actions
     */
    public getMyActions () : Observable<Array<UserActionModel>> {
         return new Observable(observer => {
             if(this._userActions == null)
                 this.getUserActions().subscribe(resp => {
                    this._userActions = resp;
                    observer.next(resp);
                }); 
            else
                observer.next(this._userActions);
         });
          
    }

     /**
    * check that the user has permissions on the requested route
    */
    public checkAllowedRoute(url: string) : Observable<boolean> {

        return new Observable(observer => {
            this.getMyActions().subscribe(lstActions => {
            if (url.match(/livemode/) != null)
                observer.next(lstActions.find(action => {
                    if (action.id == 2 ) //"View Live Mode"
                        return true;
                }) != null);
            else if (url.match(/scheduler/) != null)
                observer.next(lstActions.find(action => {
                    if (action.id == 1) // "View Programmer Mode"
                        return true;
                }) != null);
            else if (url.match(/reports/) != null)
                observer.next(lstActions.find(action => {
                    if (action.id == 3) //"View Reports"
                        return true;
                }) != null);
            else if (url.match(/medias/) != null)
                observer.next(lstActions.find(action => {
                    if (action.id == 4 ) //"View Medias"
                        return true;
                }) != null);
            else if (url.match(/usersmanager/) != null)
                observer.next(lstActions.find(action => {
                    if (action.id == 5 ) //"Manage users"
                        return true;
                }) != null);
            else
                observer.next(true);//ruta no protegida
                    
            }); 
        });
        
    }

    /**
     * Get All Roles
     */
    public getAllRoles () : Observable<Array<RoleModel>> {
          return this.http.get(config.APIs.admin + 'permissions/roles', null, null)
            .map(response => response.json(),
                err => console.log("error")               
            );  
          
    }

    /**
     * Set User Role
     */
    public setUserRole (idUser : number, idRole : number) : Observable<boolean> {
        let params = new URLSearchParams();
        params.set('idUser', idUser.toString());
        params.set('idRole', idRole.toString());
        
        return this.http.post(config.APIs.admin + 'permissions/userRole', params, null)
            .map(response => response.json(),
                err => console.log("error")               
            );  
          
    }

    /**
     * Empty user actions
     */
    public resetPermission(){
        this._userActions = null;
    }
 

    /**
     * Get actions by session data
     */
    private getUserActions(){   
         return this.http.get(config.APIs.admin + 'permissions/userAction', null, null)
            .map(response => response.json(),
                err => console.log("error")               
            );    
    } 

    
    
}