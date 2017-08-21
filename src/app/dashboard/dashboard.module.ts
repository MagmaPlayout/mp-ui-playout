import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { BlankPageModule } from './blank-page/blankPage.module';
import { DashboardComponent } from './dashboard.component';
import { SchedulerModule } from './scheduler/scheduler.module';
import {TopNavComponent} from './shared/index';
import {SidebarComponent} from './shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule,        
    	BlankPageModule,
        SchedulerModule,
        
        
    ],
    declarations: [
        DashboardComponent, 
        TopNavComponent, 
        SidebarComponent    
        ],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent],
})

export class DashboardModule { }
