import { Component, ElementRef, AfterViewChecked, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../_core/_services/user.service'
import { UserModel } from '../../../_core/_models/user.model';
import { PermissionService } from '../../../_core/_services/permission.service'
import { RoleModel } from '../../../_core/_models/role.model';
import { NotificationService } from '../../../_core/_services/notification.service';

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
    selector: 'mp-user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent {
    private _user : UserModel = <UserModel>{};
    private _rolesList : Array<RoleModel>;
    private _selectedRole : number;
    @Output() onUserSave = new EventEmitter<boolean>();

    constructor( 
        private userService: UserService, 
        private permissionService: PermissionService,
        private notificationService : NotificationService) {
        this.getRoles();      
    }

    private getRoles(){
        this.permissionService.getAllRoles() .subscribe(rolesList =>{
              this._rolesList = rolesList; 
              this._selectedRole = rolesList[0].id; 
        })  
    }

    /**
     * Create an User
     */
    private onSubmit(form) {
        this._user.idRole = this._selectedRole;
        this.userService.insert(this._user).subscribe(
            resp => {
                console.log(resp);
                if(resp)
                    this.notificationService.success("the user has been created successfully");
                else
                    this.notificationService.error("the user could not be created");
                
                this.onUserSave.emit(true);    
            },
            error => {
                this.notificationService.error(error._body);
                this.onUserSave.emit(false);    
            }
        );
        //clear object model;
        form.resetForm();
        
    }

   





}
