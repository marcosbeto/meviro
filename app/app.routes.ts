import { provideRouter }  from '@angular/router';

import { OpenProjectRoutes, AUTH_PROVIDERS } from './routes/open-project.routes';
import { AuthenticationComponent } from './components/authentication.component';

export const routes = [
	
	...OpenProjectRoutes,
	{ path: 'login', component: AuthenticationComponent }

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];

