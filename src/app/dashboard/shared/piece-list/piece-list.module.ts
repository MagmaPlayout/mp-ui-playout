import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieceListComponent} from './piece-list.component';
import {DndModule} from 'ng2-dnd';
/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot()
    ],
    declarations: [PieceListComponent],
    exports: [PieceListComponent]
})

export class PieceListModule {
    
}
