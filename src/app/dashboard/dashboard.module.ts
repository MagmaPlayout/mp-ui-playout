import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { HomeModule } from './home/home.module';
import { BlankPageModule } from './blank-page/blankPage.module';


import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from './shared/index';
import {SidebarComponent} from './shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	BsDropdownModule.forRoot(),
        ModalModule,
    	HomeModule,
    	BlankPageModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent],
})

export class DashboardModule { }
