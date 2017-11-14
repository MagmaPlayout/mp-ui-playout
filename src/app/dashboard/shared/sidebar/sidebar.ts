import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../_core/_services/permission.service';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit{
	isActive = false;
	showMenu: string = '';
    private viewLivemode : boolean = false;
    private viewScheduler : boolean = false;
    private viewReports : boolean = false;
    private viewMedias : boolean = false;
    private viewUsersManager : boolean = false;
    constructor(private permissionService : PermissionService){}
    
    ngOnInit() {
        this.permissionService.getMyActions().subscribe(lstActions => {
            lstActions.forEach(action => {
                if(action.id == 1)
                    this.viewScheduler = true;
                if(action.id == 2)
                    this.viewLivemode = true;
               
                if(action.id == 3)
                    this.viewReports = true;
                if(action.id == 4)
                    this.viewMedias = true;
                if(action.id == 5)
                    this.viewUsersManager = true;

            });
        });
    }

	eventCalled() {
		this.isActive = !this.isActive;
	}
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
    
}
