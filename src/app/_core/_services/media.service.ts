import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MediaModel } from '../../_core/_models/media.model';
import { SketchModel } from '../../_core/_models/sketch.model';
var config = require("../../app.config");

/** TO-DO Media service pasaria a ser Playout.service si se usa ws */
@Injectable()
export class MediaService {
  private url = config.APIUrls.ws_playout;  
  private socket;
  
  /**
   * Send stream to server
   * 
   */
  
  init(){

    this.socket = io(this.url);
    this.socket.emit('playoutLiveMode');   
    
    return () => {
        this.socket.disconnect();
    };
  }
  
  
  /**
   * get media list broadcasting from server
   */
  getMediaList() : Observable<Array<MediaModel>>{
    let observable = new Observable(observer => {
        
      this.socket = io(this.url);
      this.socket.on('mediaList', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  } 

  getSketchList() : Observable<Array<SketchModel>>{
    let observable = new Observable(observer => {
        
      this.socket = io(this.url);
      this.socket.on('sketchList', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }   
 
}