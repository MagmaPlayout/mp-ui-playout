import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { UserModel } from '../_models/user.model'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../_helpers/httpClient';
import {URLSearchParams, Headers, RequestOptions} from '@angular/http';

var config = require("../../app.config");

@Injectable()
export class UserService {
   
    constructor(private http: HttpClient) { 

        this.http = http;    
        
    }

    /**
     * Deprecated
     */
    public check() {
        
        return this.http.get(config.APIs.admin + 'check', null, null)
            .map(response => response.json(),
                err => console.log("error")               
            );
          
    }

    /**
     * Get all users
     */
    public getAll() : Observable<Array<UserModel>> {
        
        return this.http.get(config.APIs.admin + 'users', null, null)
            .map(response => response.json(),
                err => console.log("error")               
            );
          
    }

     /**
     * delete a piece
     * @param {PieceModel} piece
     */
    public delete(user: UserModel) : Observable<boolean> {  
        
        return  this.http.delete(config.APIs.admin + 'users/' + user.id, null, null)
               .map(response => response.json(),
                err => console.log("error")               
            );        
    }

    /**
     * create an user
     * @param {PieceModel} piece
     */
    public insert(user : UserModel) {
        let params = new URLSearchParams();

        params.set('name', user.name);
        params.set('surname', user.surname);
        params.set('username', user.username);
        params.set('password', user.password);
        params.set('idRole', user.idRole.toString());
       
       
        return  this.http.post(config.APIs.admin + 'users', params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );

          
    }


    
}