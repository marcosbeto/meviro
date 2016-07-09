import { Router, RouterConfig, ROUTER_DIRECTIVES, CanActivate }    from '@angular/router';

import { OpenProjectComponent } from '../components/open-project.component';
import { TesteComp } from '../components/teste.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { OpenProjectService } from '../services/open-project/open-project.service';

export const OpenProjectRoutes = [
  { path: 'open-project', component: OpenProjectComponent, canActivate: [AuthGuard] },
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService, OpenProjectService];