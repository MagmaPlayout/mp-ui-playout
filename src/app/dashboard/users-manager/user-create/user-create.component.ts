import { Component, ElementRef, AfterViewChecked, ViewChild, Input, Output } from '@angular/core';
import { UserService } from '../../../_core/_services/user.service'
import { UserModel } from '../../../_core/_models/user.model';


/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
    selector: 'mp-user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent {
  
    constructor( private userService: UserService) {

        
    }




}
