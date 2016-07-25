import { Router, RouterConfig, ROUTER_DIRECTIVES, CanActivate }    from '@angular/router';

import { OpenProjectComponent } from '../components/open-project.component';
import { OpenProjectFormComponent } from '../components/open-project-form.component';
import { OpenProjectListComponent } from '../components/open-project-list.component';
import { AuthGuard } from '../../auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { OpenProjectService } from '../services/open-project.service';

export const OpenProjectRoutes = [
	{
		path: 'open-project', 
		component: OpenProjectComponent, 
	  	children: [
	      { path: 'add',  component: OpenProjectFormComponent, canActivate: [AuthGuard] },
	      { path: 'update/:id',  component: OpenProjectFormComponent, canActivate: [AuthGuard]},
	      { path: 'delete/:id',  component: OpenProjectFormComponent, canActivate: [AuthGuard]},
	      { path: '',  component: OpenProjectListComponent, canActivate: [AuthGuard]},
	      // { path: ':id',  component: OpenProjectDetailComponent, canActivate: [AuthGuard]},
	    ] 
	},
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService, OpenProjectService];