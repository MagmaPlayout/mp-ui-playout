import { Route } from '@angular/router';
import { UsersManagerComponent } from './users-manager.component';
import { AuthGuard } from '../../_core/_guards/index';

export const UsersManagerRoutes: Route[] = [
	{
		path: 'usersmanager',
		component: UsersManagerComponent,
        canActivate: [AuthGuard]
	}
];
