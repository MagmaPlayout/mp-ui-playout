import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { PlayoutModel } from '../../_core/_models/playout.model';
var config = require("../../app.config");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Injectable()
export class CoreService {
    private url = config.APIs.core;  
    private socket;

    /**
     *  wait for timers data?
     */
    init(){

        //do stuff...
      
    }


    /**
    * Send a PLAYNOW command to command-manager of the core-api
    */
    apndPiece(poItem:PlayoutModel) {
       
        this.socket = io(this.url);
        this.socket.emit('core_apnd', poItem); 

        return () => {
            this.socket.disconnect();
        };

    }
  

    /**
    * Send a REMOVE command to command-manager of the core-api
    */
    remove(poItem:PlayoutModel) {
       
        this.socket = io(this.url);
        this.socket.emit('core_remove',poItem); 

        return () => {
            this.socket.disconnect();
        };

    }

     /**
    * Send a REMOVE command to command-manager of the core-api
    */
    goto(poItem:PlayoutModel) {
       
        this.socket = io(this.url);
        this.socket.emit('core_goto',poItem); 

        return () => {
            this.socket.disconnect();
        };

    }

     /**
    * Send a REMOVE command to command-manager of the core-api
    */
    move(poItem:PlayoutModel) {
       
        this.socket = io(this.url);
        this.socket.emit('core_move',poItem); 

        return () => {
            this.socket.disconnect();
        };

    } 

     /**
    * Send a GETPL command to command-manager of the core-api
    */
    getPl() {
       
        this.socket = io(this.url);
        this.socket.emit('core_getPl', null); 

        return () => {
            this.socket.disconnect();
        };

    } 

    /**
    * Wait for media list from core-api
    */
    getPlResp() : Observable<Array<any>>{

        this.getPl(); // is ok? ...

        let observable = new Observable(observer => {
            
        this.socket = io(this.url);
        this.socket.on('core_getPlResp', (resp) => {
            observer.next(resp);    
        });
        return () => {
            this.socket.disconnect();
        };  
        })     
        return observable;
    }  


    /**
     * si la lista es muy grande??
     * aca nose si conviene mandar todo el objeto porque tiene un array de medias
     */
    playPlayList(playList) {

        this.socket = io(this.url);
        this.socket.emit('core_playPl', playList); 
        return () => {
            this.socket.disconnect();
        };
    }  
 
}