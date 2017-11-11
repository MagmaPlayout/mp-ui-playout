import { Route } from '@angular/router';
import { MediasComponent } from './medias.component';
import { AuthGuard } from '../../_core/_guards/index';

export const MediasRoutes: Route[] = [
  	{
    	path: 'medias',
    	component: MediasComponent,
        canActivate: [AuthGuard]
  	}
];
