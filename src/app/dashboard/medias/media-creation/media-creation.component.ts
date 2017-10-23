import { Component, ElementRef, Input, Output, EventEmitter,ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaTagComponent } from '../media-tag/media-tag.component';
import { PieceService } from '../../../_core/_services/piece.service';
import { FilterService } from '../../../_core/_services/filter.service';
import { FilterModel } from '../../../_core/_models/filter.model';
import { PieceModel } from '../../../_core/_models/piece.model';
import { MediaModel } from '../../../_core/_models/media.model';
import { NotificationService } from '../../../_core/_services/notification.service';

@Component({
    selector: 'app-media-creation',
    templateUrl: './media-creation.component.html',
    styleUrls: ['./media-creation.component.css']
})
export class MediaCreationComponent implements OnInit{
    private _piece : PieceModel = <PieceModel>{};
    @ViewChild(MediaTagComponent) 
    private _mediaTag : MediaTagComponent;
    private _filterSelected : number;

    @Output() onPieceSave = new EventEmitter<boolean>();
    @Input()
    set media(pieceSelected: PieceModel) {

        if(pieceSelected!= null ){
            this._piece.name = "";
            this._piece.media = pieceSelected.media;
            this._piece.duration = pieceSelected.duration;
            this._piece.path = pieceSelected.path;
            this._piece.resolution = pieceSelected.resolution;
            this._piece.frameCount = pieceSelected.frameCount;
            this._piece.frameRate = pieceSelected.frameRate;
            this._piece.tagList = [];
            this._piece.filterList = [];
        }
        this.getFilters();
        
    }
    filterList : Array<FilterModel> = [];

    constructor(private _notification: NotificationService, 
                private pieceService : PieceService,
                private filterService : FilterService ) {
       this.getFilters();
    }

    ngOnInit(){
        this._filterSelected = 0;
    }

    private getFilters(){
        this.filterService.getAll().subscribe(resp => {
            if(resp.length > 0 ){
                this.filterList = resp;
                this._filterSelected = resp[0].id;  
            }
        });
    }

    private onSubmit() {
        this.newPiece();
    }

    private newPiece(){

        this._piece.tagList = this._mediaTag.getSelectedTags();
        this._piece.filterList.push(<FilterModel>{id : this._filterSelected});
       
        this.pieceService.insert(this._piece).subscribe(
            resp => {
                    console.log(name)
                    if(resp)
                        this._notification.success( 'The media has been created successfully');
                    else
                        this._notification.error('The media could not be created');
                    
                },
                err => this._notification.error(err._body)
        
        );
        this._mediaTag.clearSelectedTags();
        this.onPieceSave.emit(true);
    }

}
