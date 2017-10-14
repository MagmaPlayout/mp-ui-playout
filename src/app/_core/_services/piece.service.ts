import { Injectable } from '@angular/core';
import {  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { PieceModel } from '../../_core/_models/piece.model';
import { HttpClient} from '../_helpers/httpClient';
import {URLSearchParams, Headers, RequestOptions} from '@angular/http';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class PieceService {

    constructor(private http: HttpClient) { 

        this.http = http;    
        
    }

    /**
     * find by piece id
     * @param {number} id
     */
    public getById(id : number) {
       
        return this.http.get(config.APIs.playout_rest + 'piece/' + id, null,null)
            .map(response => response.json(),
                err => console.log("error")               
            );         
    }

    /**
     * get all
     */
    public getAll():Observable<Array<PieceModel>> {
      
        return this.http.get(config.APIs.playout_rest + 'pieces', null,null)
            .map(response => response.json(),
                err => console.log("error")               
            );        
    }


    /**
     * update an piece
     * @param {PieceModel} piece
     */
    public update(piece : PieceModel) {
        let params = new URLSearchParams();
       
		params.set('name', piece.name);
       
        return  this.http.put(config.APIs.playout_rest + 'pieces/', params, null)
               .map(response => response.json(),
                err => console.log("error")               
            );       
    }

    /**
     * delete an piece
     * @param {PieceModel} piece
     */
    public delete(piece : PieceModel) {      
        return  this.http.delete(config.APIs.playout_rest + 'pieces/' + piece.id, null, null)
               .map(response => response.json(),
                err => console.log("error")               
            );        
    }

    
}