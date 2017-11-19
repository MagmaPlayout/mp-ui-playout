import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './users-manager.component';
import { DndModule } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { UserCreateModule } from './user-create/user-create.module'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule, 
        DndModule.forRoot(),
        NgxPaginationModule,
        NgxDatatableModule,
        UserCreateModule,
        NgbModule.forRoot()
    ],
    declarations: [UsersManagerComponent],
    exports: [UsersManagerComponent]
})

export class UsersManagerModule {
    
}
