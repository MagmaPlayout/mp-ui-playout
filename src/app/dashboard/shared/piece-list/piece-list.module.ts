import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieceListComponent} from './piece-list.component';
import {PieceItemModule} from './piece-item/piece-item.module';
import {DndModule} from 'ng2-dnd';
//import {PopupModule} from 'ng2-opd-popup';
import { MediainfoComponent } from './mediainfo/mediainfo.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot(),
        NgxPaginationModule,
        PieceItemModule

        //PopupModule.forRoot(),
    ],
    declarations: [PieceListComponent, MediainfoComponent],
    exports: [PieceListComponent]
})

export class PieceListModule {
    
}
