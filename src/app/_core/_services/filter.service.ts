import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilterModel } from '../../_core/_models/filter.model';
import { HttpClient} from '../_helpers/httpClient';
import {URLSearchParams, Headers, RequestOptions} from '@angular/http';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class FilterService {
    private nameApi : string = "filters";
    
    constructor(private http: HttpClient) { 
        this.http = http;           
    }

    /**
     * get all filters
     */
    public getAll():Observable<Array<FilterModel>> {
      
        return this.http.get(config.APIs.playout_rest + this.nameApi, null,null)
            .map(response => response.json(),
                err => console.log("error")               
            );        
    }
 
}