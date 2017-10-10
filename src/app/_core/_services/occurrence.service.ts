import { Injectable } from '@angular/core';
import {  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { OccurrenceModel } from '../../_core/_models/occurrence.model';
import { HttpClient} from '../_helpers/httpClient';
import {URLSearchParams, Headers, RequestOptions} from '@angular/http';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class OccurrenceService {

    constructor(private http: HttpClient) { 

        this.http = http;    
        
    }

    /**
     * find by occurrence id
     * @param {number} id
     */
    public getById(id : number) {
       
        return this.http.get(config.APIs.playout_rest + 'occurrences/' + id, null,null)
            .map(response => response.json(),
                err => console.log("error")               
            );
          
    }

    /**
     * get all
     */
    public getAll():Observable<Array<OccurrenceModel>> {
      
        return this.http.get(config.APIs.playout_rest + 'occurrences', null,null)
            .map(response => response.json(),
                err => console.log("error")               
            );
          
    }

    /**
     * create a new occurrence
     * @param {OccurrenceModel} occurrence
     */
    public insert(occurrence : OccurrenceModel) {
        let params = new URLSearchParams();

        //params.set('id', occurrence.id.toString() );
		//params.set('playlistId', occurrence.playlistId.toString());
        occurrence.startDateTime.toISOString()
		params.set('pieceId', occurrence.pieceId.toString());
        params.set('startDateTime', occurrence.startDateTime.toISOString());
		//params.set('filerId', occurrence.filterId.toString());   
       
        return  this.http.post(config.APIs.playout_rest + 'occurrences/', params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );

          
    }

    /**
     * update an occurrence
     * @param {OccurrenceModel} occurrence
     */
    public update(occurrence : OccurrenceModel) {
        let params = new URLSearchParams();
       
		//params.set('playlistId', occurrence.playlistId.toString());
        params.set('id', occurrence.id.toString() );
		params.set('pieceId', occurrence.pieceId.toString());
        params.set('startDateTime', occurrence.startDateTime.toISOString());
		//params.set('filerId', occurrence.filterId.toString());   
       
        return  this.http.put(config.APIs.playout_rest + 'occurrences/', params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );

          
    }

    /**
     * delete an occurrence
     * @param {OccurrenceModel} occurrence
     */
    public delete(occurrence : OccurrenceModel) {
        let params = new URLSearchParams();

        params.set('id', occurrence.id.toString() );
		
       
        return  this.http.delete(config.APIs.playout_rest + 'occurrences/', params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );

          
    }

    public deleteById(id : number) {
        let params = new URLSearchParams();
        params.set('id', ''+id );
       
        return  this.http.delete(config.APIs.playout_rest + 'occurrences/', params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );

          
    }
    
}