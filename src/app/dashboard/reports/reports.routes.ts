import { Route } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AuthGuard } from '../../_core/_guards/index';

export const ReportsRoutes: Route[] = [
  	{
    	path: 'reports',
    	component: ReportsComponent,
        canActivate: [AuthGuard]
  	}
];
