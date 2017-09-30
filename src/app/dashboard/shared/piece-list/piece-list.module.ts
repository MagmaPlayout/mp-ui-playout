import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieceListComponent} from './piece-list.component';
import {DndModule} from 'ng2-dnd';
import {PopupModule} from 'ng2-opd-popup';
import { MediainfoComponent } from './mediainfo/mediainfo.component';

/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot(),
        PopupModule.forRoot(),
    ],
    declarations: [PieceListComponent, MediainfoComponent],
    exports: [PieceListComponent]
})

export class PieceListModule {
    
}
