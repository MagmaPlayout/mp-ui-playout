import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieceItemComponent} from './piece-item.component';
import {DndModule} from 'ng2-dnd';
//import {PopupModule} from 'ng2-opd-popup';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot(),
        NgxPaginationModule

        //PopupModule.forRoot(),
    ],
    declarations: [PieceItemComponent],
    exports: [PieceItemComponent]
})

export class PieceItemModule {
    
}
