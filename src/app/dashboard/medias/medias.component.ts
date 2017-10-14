import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs/Observable';
import { PieceService } from '../../_core/_services/piece.service';
import { NotificationService } from '../../_core/_services/notification.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent {
    private enabledBtnRemove : boolean = true;
    private temp = [];
    private rows = [];
    private selected = [];
    
    columns = [
        { prop: 'name', name : 'Media' },
        { prop: 'duration', name : 'Duration' },
        { prop: 'resolution', name : 'Resolution' },
        { prop: 'frameRate', name : 'Frame rate' },
        { prop: 'frameCount', name : 'Frame count' }
       
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private pieceService : PieceService, private _notification: NotificationService) {
         this.getMedias();
    }

   getMedias(){
       this.pieceService.getAll().subscribe(resp => {
            this.rows = resp;
            this.temp = resp;         
        });
   }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
   
        this.rows = temp;        
        this.table.offset = 0;
    }

    onSelect({ selected }) {    
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
       
        this.enabledBtnRemove = (this.selected.length == 0);
      
    }

    onBtnRemoveClick(){
        this.delSelectedMedias();
    }


    /**
     * Delete selected medias
     */
    private delSelectedMedias() {

        for(var i = 0 ; i < this.selected.length; i++){
           var pieceName = this.selected[i].name;
           var length = this.selected.length;
            this.pieceService.delete(this.selected[i]).subscribe(
                resp => {
                    console.log(name)
                    if(resp)
                        this._notification.success( pieceName + ' media have been deleted successfully');
                    else
                        this._notification.error( pieceName + 'media could not be deleted');
                    if(i == length){
                        this.getMedias();
                    }
                },
                err => this._notification.error(err._body)
            ); 
         
        }
        
    }

}
