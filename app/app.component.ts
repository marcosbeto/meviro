import { Component } from '@angular/core';
// import { RouteConfig, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Router, ROUTER_DIRECTIVES, CanActivate }    from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { OpenProjectService } from './services/open-project/open-project.service'; 

import { OpenProjectComponent } from './components/open-project.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';


import {LoggedInRouterOutlet} from './services/auth-router.service';
import {AuthGuard} from './auth.guard';

@Component({
    selector: 'my-app',
    providers: [
		AuthService,
		OpenProjectService,
		// AuthGuard
	], //tornando o servico disponivel para os componentes filhos
    directives: [
    	ROUTER_DIRECTIVES,
		// LoggedInRouterOutlet,
		OpenProjectComponent,			
    ],
    template: `
    	<div class="navbar-header">
		  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
		  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
		  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
		</div>
		<router-outlet></router-outlet>
	`
})


export class AppComponent { 
	
	constructor(private auth: AuthService) {} 

}
