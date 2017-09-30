import { Component, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { PlayoutService } from '../../../_core/_services/playout.service'
import { PieceModel } from '../../../_core/_models/piece.model';
import { MediainfoComponent } from './mediainfo/mediainfo.component';
declare var jQuery: any;
declare var moment : any;

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
  selector: 'mp-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrls: ['./piece-list.component.css']
})
export class PieceListComponent implements AfterViewChecked {
  
  @ViewChild(MediainfoComponent)
  private mediaInfoPopup: MediainfoComponent;
  elementRef: ElementRef;
  pieceLst : Array<PieceModel> = new Array<PieceModel>();

  constructor(private element:ElementRef, private playoutService: PlayoutService){
    this.elementRef = element;
    this.playoutService.init();
		this.playoutService.getPieceList().subscribe( resp  => {
      /*
      resp.forEach(element  => {
        element.duration = moment.duration(element.duration, moment.ISO_8601);
      });
      */
			this.pieceLst = resp;  

    });

	}

  
  ngAfterViewChecked(){ // se ejecuta por cada evento/cambio en el dom.

    let piecesLiDraggables = jQuery(".mp-item-media.list-group-item.draggable.ui-draggable.ui-draggable-handle");
    let piecesLiElements = jQuery(".mp-item-media");

    if(piecesLiElements .length != piecesLiDraggables.length){
        
         for(var i = 0; i <= piecesLiElements .length -1; i++){
           jQuery(piecesLiElements[i]).draggable({revert:true,zIndex:999,revertDuration:100});

           jQuery(piecesLiElements[i]).data('pieceData', {
              title: this.pieceLst[i].name, // use the element's text as the event title
              stick: true, // maintain when user navigates (see docs on the renderEvent method)
              piece : this.pieceLst[i]
            });
         }
     
    }

  }

  onClickMediaInfo(piece: PieceModel){
		console.log(piece);
		this.mediaInfoPopup.show(piece.media);
	}

}
