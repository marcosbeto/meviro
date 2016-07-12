import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 

@Component({
    selector: 'my-app',
    providers: [ //Those are the classes that will PROVIDE services for the rest of the app
		AuthService,
		OpenProjectService,
	], 
    directives: [
    	ROUTER_DIRECTIVES,
    ],
    template: `
    	<div class="navbar-header">
		  <button class="btn btn-primary btn-margin" (click)="authService.login()" *ngIf="!authService.authenticated()">Log In</button>
		  <button class="btn btn-primary btn-margin" (click)="authService.logout()" *ngIf="authService.authenticated()">Log Out</button>
		</div>
		<router-outlet></router-outlet>
	`
})


export class AppComponent { 
	
	constructor(private authService: AuthService, private router:Router) {
		this.setRXJSListeners();
	} 

	setRXJSListeners() {
     	this.authService.getLoggedOut(null).subscribe((user: Object) => {
       		this.router.navigate(['/login']);
     	});
 	}

}
