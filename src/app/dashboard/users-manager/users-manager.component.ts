import { Component, ElementRef, TemplateRef,AfterViewChecked, ViewChild, Input, Output, OnInit } from '@angular/core';
import { UserService } from '../../_core/_services/user.service'
import { UserModel } from '../../_core/_models/user.model';
import { PermissionService } from '../../_core/_services/permission.service'
import { UserActionModel } from '../../_core/_models/userAction.model';
import { RoleModel } from '../../_core/_models/role.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NotificationService } from '../../_core/_services/notification.service';
import {NgForm} from '@angular/forms';

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
    selector: 'mp-users-manager',
    templateUrl: './users-manager.component.html',
    styleUrls: ['./users-manager.component.css']
})
export class UsersManagerComponent implements OnInit{
    private enabledOptions : boolean = true;
    private temp = [];
    private rows = [];
    private usersSelected = [];
    private _roleList = [];
    @ViewChild('btnNewUser') btnNew: ElementRef;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    @ViewChild('trashTmpl') trashTmpl: TemplateRef<any>;
    

    columns = [];


    constructor(
        private notificationService: NotificationService,
        private userService: UserService,
        private permissionService : PermissionService) {
            this.getUsersWithRoles();
        
    }

      ngOnInit() {
        this.columns = 
        [
            { prop: 'name', name : 'Name' },
            { prop: 'username', name : 'Username' },
            {
                cellTemplate: this.editTmpl,
                prop:'role',
                name: 'Role'
            },
            {
                
                cellTemplate: this.trashTmpl,
                name: '',
                width:20
            },
        ];
    }

    private getUsersWithRoles(){
        this.userService.getAll().subscribe(userList => {
            console.log(userList)
            this.permissionService.getAllRoles() .subscribe(roleList =>{
                this._roleList = roleList;
                this.rows = userList.map( user=>{
                    user.name = user.name + ', ' + user.surname;
                    user.role = roleList.find(rol =>{
                        if(rol.id == user.idRole)
                            return true;
                    });
                    return user;
                });
                this.temp = this.rows; 
                this.usersSelected = [];
                console.log(this.rows);
            })  
            
        });
    }

    /**
     * On selected role.
     * Update user idRole
     */
    onSelectedRole(user, idRole ){
        this.permissionService.setUserRole(user.id, idRole).subscribe(
            resp => {
                console.log(resp)
                if(resp)
                    this.notificationService.success("the user role has been updated successfully");
                else
                    this.notificationService.error("the user role could not be updated")
            },
            error => this.notificationService.error(error._body)
        );
    }

    /**
     * On click trash
     * Delete user
     */
    onClickDelete(user ){
        this.userService.delete(user).subscribe(
            resp => {
                console.log(resp);
                if(resp)
                    this.notificationService.success("the user has been deleted successfully");
                else
                    this.notificationService.error("the user could not be deleted");

                this.getUsersWithRoles();
            },
            error => this.notificationService.error(error._body)
        );
    }

     /**
     * After submit, trigger collapse event and update the user list.
     */
    private onUserSave(result){
        let btn = this.btnNew.nativeElement as HTMLElement;
        btn.click();
        this.enabledOptions = true;
        this.getUsersWithRoles();
        
    }




}
