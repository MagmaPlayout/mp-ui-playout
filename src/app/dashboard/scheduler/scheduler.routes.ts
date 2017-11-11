import { Route } from '@angular/router';
import { SchedulerComponent } from './scheduler.component';
import { AuthGuard } from '../../_core/_guards/index';

export const SchedulerRoutes: Route[] = [
	{
		path: 'scheduler',
		component: SchedulerComponent,
         canActivate: [AuthGuard]
	}
];
