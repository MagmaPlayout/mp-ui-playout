import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_core/_services/authentication.service';
import { NotificationService } from '../_core/_services/notification.service';
import { PermissionService } from '../_core/_services/permission.service';
import { NotiOptionModel} from "../_core/_models/noti.option.model";
import { DashboardRoutes } from '../dashboard/dashboard.routes'
/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	providers:[AuthenticationService]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService,
        private permissionService: PermissionService
		) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.permissionService.resetPermission();
    }

    login() {
        this.loading = true;
        this.notificationService.remove();
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    let dashboardRoute = DashboardRoutes[0];
                    let redirected : boolean = false;
                    //direcciono a la primera ruta que tenga permisos
					dashboardRoute.children.forEach(route => {
                        
                        this.permissionService.checkAllowedRoute(route.path).subscribe(resp =>{
                            if(resp && !redirected){
                                redirected = true;
                                return this.router.navigate(["/" + dashboardRoute.path + "/" + route.path]); 
                                
                            }
                               
                        });
                    })

                    
                },
                error => {
                    this.notificationService.error(error, null, <NotiOptionModel>{timeOut : 0, maxStack : 1});					
                    this.loading = false;
                }
        );
    }
}
