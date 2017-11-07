import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';

@Component({
    moduleId: module.id,
    selector: 'mp-notification',
    templateUrl: 'notification.component.html',
    //providers:[AlertService]
})

export class NotificationComponent {
    private options : any = new Object();
    constructor(private notificationService: NotificationService) { }
    
    ngOnInit() {
        this.notificationService.getOptions().subscribe( options => { this.options = options; });
    }
    
}