import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TagModel } from '../../_core/_models/tag.model';
import { HttpClient} from '../_helpers/httpClient';
import {URLSearchParams, Headers, RequestOptions} from '@angular/http';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class TagService {
    private nameApi : string = "tags";
    
    constructor(private http: HttpClient) { 
        this.http = http;           
    }

    /**
     * get all tags
     */
    public getAll():Observable<Array<TagModel>> {
      
        return this.http.get(config.APIs.playout_rest + this.nameApi, null,null)
            .map(response => response.json(),
                err => console.log("error")               
            );        
    }

    /**
     * create a new tag
     * @param {TagModel} occurrence
     */
    public insert(tag : TagModel) {
        let params = new URLSearchParams();
        params.set('tag', tag.tag );
        return  this.http.post(config.APIs.playout_rest + this.nameApi, params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );      
    }

    
}