import { provideRouter }  from '@angular/router';
import { MetaService } from 'ng2-meta';

import { OpenProjectRoutes, AUTH_PROVIDERS } from './open-project/routes/open-project.routes';
import { AuthenticationComponent } from './auth/components/authentication.component';

export const routes = [
	
	...OpenProjectRoutes,
	{ path: 'login', component: AuthenticationComponent, 
		// TODO (meta data): data: {meta: {title: 'Home page',titleSuffix: ' | Website Name',description: 'Description of the home page'}}
	},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];

