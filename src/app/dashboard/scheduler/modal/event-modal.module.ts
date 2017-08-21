import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventModalComponent} from './event-modal.component';
import {DndModule} from 'ng2-dnd';
/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot()
    ],
    declarations: [EventModalComponent],
    exports: [EventModalComponent]
})
export class EventModalModule {
    
}
