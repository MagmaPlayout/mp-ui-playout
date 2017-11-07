import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_core/_services/authentication.service';
import { NotificationService } from '../_core/_services/notification.service';
import { NotiOptionModel} from "../_core/_models/noti.option.model";
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
        private notificationService: NotificationService
		) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
    }

    login() {
        this.loading = true;
        this.notificationService.remove();
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
					
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.notificationService.error(error, null, <NotiOptionModel>{timeOut : 0, maxStack : 1});					
                    this.loading = false;
                });
    }
}
