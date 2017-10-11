import { Route } from '@angular/router';
import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { SchedulerRoutes } from './scheduler/index';
import { ReportsRoutes } from './reports/index';
import { FiltersRoutes } from './filters/index';
import { DashboardComponent } from './index';
import { AuthGuard } from '../_core/_guards/index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
		canActivate: [AuthGuard],
    	children: [
	    	...HomeRoutes,	        
	    	...BlankPageRoutes,
			...SchedulerRoutes,
			...ReportsRoutes,
			...FiltersRoutes
    	]
  	}
];
