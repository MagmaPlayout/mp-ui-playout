import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {DndModule} from 'ng2-dnd';
import {CoreModule} from '../../_core/core.module'
import {PieceListModule} from '../shared/piece-list/piece-list.module';
import {EventModalModule} from '../scheduler/modal/event-modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
@NgModule({
    imports: [
        CommonModule, 
        CoreModule, 
        EventModalModule,
        PieceListModule, 
        DndModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule,BsDropdownModule, AlertModule } from 'ng2-bootstrap';
import {DndModule} from 'ng2-dnd';
import {CoreModule} from '../../_core/core.module'
import {PopupModule} from 'ng2-opd-popup';
import { MediainfoComponent } from './mediainfo/mediainfo.component';
import {EventModalModule} from '../scheduler/modal/event-modal.module';


@NgModule({
    imports: [
        CommonModule, 
        CarouselModule, 
        BsDropdownModule, 
        CoreModule, 
        AlertModule,
        EventModalModule, 
        DndModule.forRoot(),
        PopupModule.forRoot()
    ],
    declarations: [HomeComponent, MediainfoComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
*/