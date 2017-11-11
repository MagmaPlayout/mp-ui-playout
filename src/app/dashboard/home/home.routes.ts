import { Route } from '@angular/router';
import { HomeComponent } from './index';
import { AuthGuard } from '../../_core/_guards/index';

export const HomeRoutes: Route[] = [
  	{
    	path: 'livemode',
    	component: HomeComponent,
        canActivate: [AuthGuard]
  	}
];
