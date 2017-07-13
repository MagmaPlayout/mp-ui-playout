import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule,BsDropdownModule, AlertModule } from 'ng2-bootstrap';
import {DndModule} from 'ng2-dnd';
import {CoreModule} from '../../_core/core.module'
import {PopupModule} from 'ng2-opd-popup';
import { MediainfoComponent } from './mediainfo/mediainfo.component';

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@NgModule({
    imports: [
        CommonModule, 
        CarouselModule, 
        BsDropdownModule, 
        CoreModule, 
        AlertModule, 
        DndModule.forRoot(),
        PopupModule.forRoot()
    ],
    declarations: [HomeComponent, MediainfoComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
