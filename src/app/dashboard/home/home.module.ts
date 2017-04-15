import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap';
import {Ng2DragDropModule} from "ng2-drag-drop";

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule,Ng2DragDropModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
