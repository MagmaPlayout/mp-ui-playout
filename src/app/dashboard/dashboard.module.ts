import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlankPageModule } from './blank-page/blankPage.module';
import { DashboardComponent } from './dashboard.component';
import { SchedulerModule } from './scheduler/scheduler.module';
import {TopNavComponent} from './shared/index';
import {SidebarComponent} from './shared/index';
import { ReportsModule} from './reports/reports.module';
import { FiltersModule} from './filters/filters.module';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule, 
        NgbModule.forRoot(),       
    	BlankPageModule,
        SchedulerModule,
        ReportsModule,
        FiltersModule
        
        
    ],
    declarations: [
        DashboardComponent, 
        TopNavComponent, 
        SidebarComponent  
        ],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent],
})

export class DashboardModule { }
