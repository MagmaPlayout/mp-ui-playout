import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService} from '../_services/user.service'
import { Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService : UserService) { }
    
    /**
     *  check user logged
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        
         return Observable.create((observer:Subject<boolean>) => { 
             
                this.userService.check()
                        .subscribe(resp => {
                            
                            if (resp.id) 
                                observer.next(true);
                            else{
                                // not logged in so redirect to login page with the return url
                                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                                observer.next(false);
                            }
                                
                        
                    });         
                })
    } 
}