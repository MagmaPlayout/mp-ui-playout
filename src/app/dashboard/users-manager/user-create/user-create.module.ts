import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create.component';
import { DndModule } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination'; 


@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot(),
        FormsModule,
        NgxPaginationModule,
        NgxDatatableModule,
    ],
    declarations: [UserCreateComponent],
    exports: [UserCreateComponent]
})

export class UserCreateModule {
    
}
