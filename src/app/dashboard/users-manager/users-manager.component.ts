import { Component, ElementRef, TemplateRef,AfterViewChecked, ViewChild, Input, Output, OnInit } from '@angular/core';
import { UserService } from '../../_core/_services/user.service'
import { UserModel } from '../../_core/_models/user.model';
import { PermissionService } from '../../_core/_services/permission.service'
import { UserActionModel } from '../../_core/_models/userAction.model';
import { RoleModel } from '../../_core/_models/role.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';


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

    columns = [];


    constructor(
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
                headerTemplate: this.hdrTpl,
                name: 'role'
            },
        ];
    }

     getUsersWithRoles(){
        this.userService.getAll().subscribe(userList => {
            console.log(userList)
            this.permissionService.getAllRoles() .subscribe(roleList =>{
                this._roleList = roleList;
                this.rows = userList.map( user=>{
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


    onSelectedRole(user, idRole ){
        this.permissionService.setUserRole(user.id, idRole).subscribe(resp =>{
            console.log(resp);  
        })
    }




}
