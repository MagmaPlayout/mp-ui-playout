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
    selector: 'app-piece-edit',
    templateUrl: './piece-edit.component.html',
    styleUrls: ['./piece-edit.component.css']
})
export class PieceEditComponent implements OnInit{
    private _piece : PieceModel = <PieceModel>{};//piece form
    private _isOriginalPiece : boolean = false;
    private _pieceSelected : PieceModel;
    @ViewChild(MediaTagComponent) 
    private _mediaTag : MediaTagComponent;
    private _filterSelected : number; 
    filterList : Array<FilterModel> = [];
    
    @Output() onPieceSave = new EventEmitter<boolean>();
   
    @Input()
    set piece(pieceSelected: PieceModel) {
        
        if( pieceSelected){
            this._isOriginalPiece = pieceSelected.filterConfigList.length == 0;// por ahora esta es la unica forma de saberlo.
            this._piece.id = pieceSelected.id;
            this._piece.name = pieceSelected.name;
            this._piece.filterConfigList = pieceSelected.filterConfigList;   
            this._piece.media = pieceSelected.media;
            this._piece.duration = pieceSelected.duration;
            this._piece.path = pieceSelected.path;
            this._piece.resolution = pieceSelected.resolution;
            this._piece.frameCount = pieceSelected.frameCount;
            this._piece.frameRate = pieceSelected.frameRate;
            this._piece.tagList = pieceSelected.tagList;
            // por ahora solo se puede seleccioanr un filtro.
            this._filterSelected = this._piece.filterConfigList.length > 0 ? this._piece.filterConfigList[0].filterId : -1;           

        }
        
    }
    

    constructor(private _notification: NotificationService, 
                private pieceService : PieceService,
                private filterService : FilterService,
                private coreService : CoreService ) {
       this.getFilters();
    }

    ngOnInit(){
        this._filterSelected = 0;
    }

    private getFilters(){
     
        this.filterService.getAll().subscribe(resp => {
            if(resp.length > 0 ){              
                this.filterList = resp;
                //this.filterList.unshift(<FilterModel>{id : -1, name : "Choose one"});
            }
        });
    }

    private updatePiece(){
        if(!this._isOriginalPiece){
            this._piece.tagList = this._mediaTag.getSelectedTags();
        
            this.pieceService.update(this._piece).subscribe(
                    resp => {
                       
                        if(resp){
                            this.coreService.applyFilter(<CmdApplyFilterModel>{from : this._piece.path, piece : this._piece});
                            this._notification.success( 'The piece has been update successfully');
                        }        
                        else
                            this._notification.error('The piece could not be updated');
                        
                        
                        this.onPieceSave.emit(true);
                        
                    },
                    err => {
                        this._notification.error(err._body);
                        this.onPieceSave.emit(true);
                    }              
            );
        }
        else{
            this._notification.error('The original media can not be modified');
        }

        this.onPieceSave.emit(false);
        this._mediaTag.clearSelectedTags();
    }

    private onSubmit() {
        this.updatePiece();           
    }

    /**
     * TO-DO -> Sacar hardcodeo del value.
     */
    onChangeFilter(filterId){
        this._filterSelected = filterId;
        var filterObjectSelected = <FilterModel>this.filterList.find( item => item.id == filterId);
        this._piece.filterConfigList = [];
        this._piece.filterConfigList.push(<FilterConfigModel>{
            filterId : filterObjectSelected.id,
            filterArgId : filterObjectSelected.filterArgsList[0].id,
            value : filterObjectSelected.name,
            filterIndex : 1,
            filter : filterObjectSelected,
            filterArg : filterObjectSelected.filterArgsList[0]
        });
    }


}


