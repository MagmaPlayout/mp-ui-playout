import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MediaModel } from '../../_core/_models/media.model';
import { SketchModel } from '../../_core/_models/sketch.model';
var config = require("../../app.config");


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
    playMedia(media:MediaModel) {
       
        this.socket = io(this.url);
        this.socket.emit('core_playMedia', null); 

        return () => {
            this.socket.disconnect();
        };

    } 

    /**
     * si la lista es muy grande??
     * aca nose si conviene mandar todo el objeto porque tiene un array de medias
     */
    playPlayList(playList) : void {

        this.socket = io(this.url);
        this.socket.emit('core_playMedia', playList); 
        this.socket.disconnect();
    }   
 
}