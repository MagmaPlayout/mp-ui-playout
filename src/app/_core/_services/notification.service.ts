import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {NotificationsService } from 'angular2-notifications-lite';
import { Observable, Subject } from "rxjs";
import { NotiOptionModel} from "../_models/noti.option.model";

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class NotificationService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    //Dafault options
    private options = {
        position: ["top", "left"],
        timeOut: 5000,
        lastOnBottom: false
        
    };

    constructor(private router: Router,  private _notification: NotificationsService) {

    }

    public success(message: string, title : string = null, notiOptions : NotiOptionModel = null) {
        
        this._notification.success(
                title == null ? "Success" : title,
                message
        );

        this.setOptions(notiOptions);   
    }

    warning(message: string, title : string = null, notiOptions : NotiOptionModel = null) {
       this._notification.info(
                title == null ? "Warning" : title,
                message
        );
        this.setOptions(notiOptions);   
    }

    public info(message: string, title : string = null, notiOptions : NotiOptionModel = null) {
        this._notification.info(
                title == null ? "Info" : title,
                message
        );
        this.setOptions(notiOptions);   
    }

    public error( message: string, title : string = null, notiOptions : NotiOptionModel = null) {       
        this._notification.error(
                title == null ? "Error" : title,
                message
        );
        this.setOptions(notiOptions);   
    }

    public getOptions(): Observable<any> {
        return this.subject.asObservable();
    }

    /** Clear all the notifications */
    public remove() : void {
        this._notification.remove();
    }

    private setOptions(notiOptions) : void {

        if(notiOptions != null)
            Object.assign(this.options, notiOptions);

        this.subject.next(this.options);

    }

    
}