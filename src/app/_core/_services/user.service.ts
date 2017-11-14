import { Injectable } from '@angular/core';
import {  Response} from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpClient } from '../_helpers/httpClient';

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
     * 
     */
    public getAll() {
        
        return this.http.get(config.APIs.admin + 'users', null, null)
            .map(response => response.json(),
                err => console.log("error")               
            );
          
    }

    
}