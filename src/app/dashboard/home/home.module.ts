import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap';
import {DndModule} from 'ng2-dnd';
import {CoreModule} from '../../_core/core.module'

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, CoreModule, AlertModule, DndModule.forRoot()],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
