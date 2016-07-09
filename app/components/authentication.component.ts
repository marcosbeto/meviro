import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

@Component({
	selector: 'authentication_selector',
	template: '<h1>Login</h1>',
	// styleUrls: ['app/hero-detail.component.css'],
	directives: [
    	ROUTER_DIRECTIVES,
		// LoggedInRouterOutlet,
		
    ],
})

export class AuthenticationComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
					 	
		this.setRXJSListeners();
		
	}

	setRXJSListeners() {

		this.authService.getLogged(null).subscribe((user: Object) => {
        	this.router.navigate(['/open-project']);
     	});

	}

}