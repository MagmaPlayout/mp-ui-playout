import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'mg-alert',
    templateUrl: 'alert.component.html',
    //providers:[AlertService]
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}