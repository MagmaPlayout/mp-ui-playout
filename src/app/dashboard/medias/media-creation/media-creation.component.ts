import { Component, ElementRef, Input, Output, EventEmitter,ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaTagComponent } from '../media-tag/media-tag.component';
import { PieceService } from '../../../_core/_services/piece.service';
import { FilterService } from '../../../_core/_services/filter.service';
import { FilterModel } from '../../../_core/_models/filter.model';
import { FilterConfigModel } from '../../../_core/_models/filterConfig.model';
import { PieceModel } from '../../../_core/_models/piece.model';
import { MediaModel } from '../../../_core/_models/media.model';
import { CmdApplyFilterModel } from '../../../_core/_models/cmd.applyfilter.model';
import { NotificationService } from '../../../_core/_services/notification.service';
import { CoreService } from '../../../_core/_services/core.service';

@Component({
    selector: 'app-media-creation',
    templateUrl: './media-creation.component.html',
    styleUrls: ['./media-creation.component.css']
})
export class MediaCreationComponent implements OnInit{
    private _piece : PieceModel = <PieceModel>{};//piece for forme
    private _pieceSelected : PieceModel;
    @ViewChild(MediaTagComponent) 
    private _mediaTag : MediaTagComponent;
    private _filterSelected : number;
    
    @Output() onPieceSave = new EventEmitter<boolean>();
    
    @Input()
    set piece(pieceSelected: PieceModel) {
        if(pieceSelected != null){
            this._piece.name = "";
            this._piece.filterConfigList = [];   
            this._piece.media = pieceSelected.media;
            this._piece.duration = pieceSelected.duration;
            this._piece.path = pieceSelected.path;
            this._piece.resolution = pieceSelected.resolution;
            this._piece.frameCount = pieceSelected.frameCount;
            this._piece.frameRate = pieceSelected.frameRate;
            this._piece.tagList = [];
        }
        this.getFilters();
        
    }
    filterList : Array<FilterModel> = [];

    constructor(private _notification: NotificationService, 
                private pieceService : PieceService,
                private filterService : FilterService,
                private coreService : CoreService  ) {
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
        var filterConfig = <FilterConfigModel>{
            filterId : this._filterSelected,
            filterArgId : 1,
            value : "Filter Arg hardcodeado",
            filterIndex : 1
        };
        this._piece.filterConfigList.push(filterConfig);

        this.pieceService.insert(this._piece).subscribe(
            resp => {
                    //to-do -> aca llamar al coreService para el comando APPLYFILTER
                    if(resp){
                        //this._piece.filterConfigList[0].piec
                        this.coreService.applyFilter(<CmdApplyFilterModel>{from : this._piece.path, piece : resp});
                        this._notification.success( 'The media has been created successfully');
                    }      
                    else
                        this._notification.error('The media could not be created');
                    
                    this._mediaTag.clearSelectedTags();
                    this.onPieceSave.emit(true);
                    
                    
                },
                err => {
                    this._notification.error(err._body);
                    this.onPieceSave.emit(false);
                }   
        );
       
        
    }
}


