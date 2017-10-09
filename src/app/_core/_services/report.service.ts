import { Injectable } from '@angular/core';
import {  Response} from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpClient } from '../_helpers/httpClient';

var config = require("../../app.config");

@Injectable()
export class ReportService {
   
    constructor(private http: HttpClient) { 

        this.http = http;    
        
    }

    public getByFilters(filters) {
        
        return this.http.get(config.APIs.admin + 'playoutLogFilter/'+ JSON.stringify(filters), null, null)
            .map(response => response.json(),
                err => console.log("error")               
            );
          
    }

    
}