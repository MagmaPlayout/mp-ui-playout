import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService} from '../_services/user.service'
import { Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { PermissionService } from '../_services/permission.service';
import { UserActionModel } from '../_models/userAction.model';

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
    private router: Router, 
    private userService : UserService,
    private permissionService : PermissionService) {
       
    }
    
    /**
     *  check that the user has permissions on the requested route
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return Observable.create((observer: Subject<boolean>) => {

            this.permissionService.checkAllowedRoute(state.url).subscribe(resp => {

                if (resp) {
                    observer.next(true);
                }
                else {
                    // not logged or not has permission so redirect to login page
                    this.router.navigate(['/login'], { queryParams: { } });
                    observer.next(false);
                }
            });
        })
    }

}