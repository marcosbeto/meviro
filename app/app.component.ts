import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, CanActivate }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 
import { OpenProjectComponent } from './open-project/components/open-project.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {AuthGuard} from './auth.guard';

@Component({
    selector: 'my-app',
    providers: [
		AuthService,
		OpenProjectService,
	], //tornando o servico disponivel para os componentes filhos
    directives: [
    	ROUTER_DIRECTIVES,
		OpenProjectComponent,			
    ],
    template: `
    	<div class="navbar-header">
		  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
		  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
		</div>
		<router-outlet></router-outlet>
	`
})


export class AppComponent { 
	
	constructor(private auth: AuthService) {} 

}
