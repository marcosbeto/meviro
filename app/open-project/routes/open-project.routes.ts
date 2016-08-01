import { Router, RouterConfig, ROUTER_DIRECTIVES, CanActivate }    from '@angular/router';

import { OpenProjectComponent } from '../components/open-project.component';
import { OpenProjectFormComponent } from '../components/open-project-form.component';
import { OpenProjectListComponent } from '../components/open-project-list.component';
import { AuthGuard } from '../../auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { OpenProjectService } from '../services/open-project.service';
import { StepComponent } from '../steps/components/step.component';
import { StepFormComponent } from '../steps/components/step-form.component';
import { PhotoFormComponent } from '../steps/photos/components/photo-form.component';
import { StepService } from '../steps/services/step.service';

export const OpenProjectRoutes = [
	{
		path: 'open-project', 
		component: OpenProjectComponent, 
	  	children: [
	      { path: 'add',  component: OpenProjectFormComponent, canActivate: [AuthGuard] },
	      { path: 'update/:id',  component: OpenProjectFormComponent, canActivate: [AuthGuard]},
	      { path: 'delete/:id',  component: OpenProjectFormComponent, canActivate: [AuthGuard]},
	      { path: 'update/:id/step/update/:step_id',  component: StepFormComponent, canActivate: [AuthGuard]},
	      { path: 'update/:id/step/delete/:step_id',  component: StepFormComponent, canActivate: [AuthGuard]},
		  { path: 'project/:project_id/step/:step_id/photo/delete/:photo_id',  component:PhotoFormComponent, canActivate: [AuthGuard]},
	      { path: '',  component: OpenProjectListComponent, canActivate: [AuthGuard]},

	      // { path: ':id',  component: OpenProjectDetailComponent, canActivate: [AuthGuard]},
	    ] 
	},
	{
		path: '',
		component: OpenProjectListComponent
	}
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService, OpenProjectService, StepService];



// {
// 		path: 'open-project', 
// 		component: OpenProjectComponent, 
// 	  	children: [
// 	      { path: 'add',  component: OpenProjectFormComponent, canActivate: [AuthGuard] },
// 	      { path: 'update/:id',  component: OpenProjectFormComponent, canActivate: [AuthGuard]},
// 	      { path: 'delete/:id',  component: OpenProjectFormComponent, canActivate: [AuthGuard]},
// 	      { path: 'update/:id/step/update/:step_id',  component: StepFormComponent, canActivate: [AuthGuard]},
// 	      { path: 'update/:id/step/delete/:step_id',  component: StepFormComponent, canActivate: [AuthGuard]},
// 		  { path: 'project/:project_id/step/:step_id/photo/delete/:photo_id',  component:PhotoFormComponent, canActivate: [AuthGuard]},
// 	      { path: '',  component: OpenProjectListComponent, canActivate: [AuthGuard]},

// 	      // { path: ':id',  component: OpenProjectDetailComponent, canActivate: [AuthGuard]},
// 	    ] 
// 	},
// 	{
// 		path: '',
// 		component: OpenProjectListComponent
// 	}