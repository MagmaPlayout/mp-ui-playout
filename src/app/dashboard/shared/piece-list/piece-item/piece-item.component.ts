import { Component, ElementRef, AfterViewChecked, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { PlayoutService } from '../../../../_core/_services/playout.service'
import { PieceModel } from '../../../../_core/_models/piece.model';
declare var jQuery: any;
declare var moment: any;

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@Component({
    selector: 'mp-piece-item',
    templateUrl: './piece-item.component.html',
    styleUrls: ['./piece-item.component.css']
})
export class PieceItemComponent {
    private _piece : PieceModel = null;
    //Outputs
    @Output() onPlay = new EventEmitter<PieceModel>();
    @Output() onRemove = new EventEmitter<PieceModel>();
    @Output() onInfo = new EventEmitter<PieceModel>();
    @Output() onAdd = new EventEmitter<PieceModel>();
    
    //Inputs
    @Input('isJuiDraggable') isJuiDraggable: boolean = false;
    @Input('playBtn') playBtn: boolean = false;
    @Input('removeBtn') removeBtn: boolean = false;
    @Input('infoBtn') infoBtn: boolean = false;
    @Input('addBtn') addBtn: boolean = false;
    
    @Input()
    set piece(piece: PieceModel) {
        console.log(piece);
        if(piece){
            this._piece = piece;
            var mDur = moment.duration(piece.duration, moment.ISO_8601);
            piece.durationHuman = moment.utc(mDur.asMilliseconds()).format("HH:mm:ss");
        }
        
    }
  
    constructor(private element: ElementRef, private playoutService: PlayoutService) {

    }

    // Events
    onPlayClick(piece: PieceModel) {
       this.onPlay.emit(piece);
    }

    onRemoveClick(piece: PieceModel) {
       this.onRemove.emit(piece);
    }

    onInfoClick(piece: PieceModel) {
       this.onInfo.emit(piece);
    }

    onAddClick(piece: PieceModel) {
       this.onAdd.emit(piece);
    }

}
