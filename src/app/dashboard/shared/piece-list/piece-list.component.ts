import { Component, ElementRef, AfterViewChecked, ViewChild, Input } from '@angular/core';
import { PlayoutService } from '../../../_core/_services/playout.service'
import { PieceModel } from '../../../_core/_models/piece.model';
import { MediainfoComponent } from './mediainfo/mediainfo.component';
var config = require("../../../app.config");
declare var jQuery: any;
declare var moment: any;

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
    selector: 'mp-piece-list',
    templateUrl: './piece-list.component.html',
    styleUrls: ['./piece-list.component.css']
})
export class PieceListComponent implements AfterViewChecked {
    private itemsPerPage : number = config.mediaPlaylist.itemsPerPage;
    private p : number = 1;
    @ViewChild(MediainfoComponent)
    private mediaInfoPopup: MediainfoComponent;
    @Input('isJuiDraggable') isJuiDraggable: boolean = false;

    elementRef: ElementRef;
    pieceFilteredList: Array<PieceModel> = new Array<PieceModel>();//result of a search
    pieceLst: Array<PieceModel> = new Array<PieceModel>();// all pieces
  
    constructor(private element: ElementRef, private playoutService: PlayoutService) {
        this.elementRef = element;
        this.playoutService.init();
        this.playoutService.getPieceList().subscribe(resp => {
            // Converts the duration to a printable format
            resp.forEach(element => {
                var mDur = moment.duration(element.duration, moment.ISO_8601);
                element.durationHuman = moment.utc(mDur.asMilliseconds()).format("HH:mm:ss");
            });

            this.pieceLst = resp;
            this.pieceFilteredList = resp;
        });
    }


    ngAfterViewChecked() { // se ejecuta por cada evento/cambio en el dom.
        
        if (this.isJuiDraggable) {
            let piecesLiDraggables = jQuery(".mp-item-media.list-group-item.draggable.ui-draggable.ui-draggable-handle");
            let piecesLiElements = jQuery(".mp-item-media");
            console.log("ngAfterView");
            console.log(this.p);
            if (piecesLiElements.length != piecesLiDraggables.length) {

                for (var i = 0; i <= piecesLiElements.length - 1; i++) {
                    console.log(this.pieceFilteredList[i * this.p]);
                    jQuery(piecesLiElements[i]).draggable({ revert: true, zIndex: 999, revertDuration: 100 });
                    jQuery(piecesLiElements[i]).data('pieceData', {
                        title: this.pieceLst[i].name, // use the element's text as the event title
                        stick: true, // maintain when user navigates (see docs on the renderEvent method)
                        piece: this.pieceFilteredList[((this.p * this.itemsPerPage) - this.itemsPerPage) + i ]
                    });
                }
            }
        }

    }

    onInfo(piece: PieceModel) {
        this.mediaInfoPopup.show(piece.media);
    }
    onAdd(piece: PieceModel) {
        //this.mediaInfoPopup.show(piece.media);
    }

    onDrag(){
        console.log(this.pieceLst)
    }

    onSearch(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        this.pieceFilteredList = this.pieceLst.filter(function (p) {
            return p.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        if(val == ""){
            this.pieceFilteredList = this.pieceLst;
        }
    }

}
