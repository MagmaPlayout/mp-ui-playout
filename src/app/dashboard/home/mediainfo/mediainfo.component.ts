import { Component, OnInit} from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import { MediaModel } from '../../../_core/_models/media.model';

@Component({
  selector: 'app-mediainfo',
  templateUrl: './mediainfo.component.html',
  styleUrls: ['./mediainfo.component.css']
})
export class MediainfoComponent implements OnInit {
  
  private media : MediaModel = <MediaModel>{};
  constructor(private popup:Popup) { }

  ngOnInit() {
    this.popup.options = {
    color: "#ff4121", // red, blue.... 
    header: "Your custom header",
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
    //confirmBtnContent: null,//"OK", // The text on your confirm button 
    cancleBtnContent: "Cancel", // the text on your cancel button 
    //confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 
};
  }

  show(media: MediaModel):void{
    console.log(media);
    this.media = media;
    this.popup.options.header = media.name;
    this.popup.show();
  }

}
