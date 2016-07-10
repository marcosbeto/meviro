import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';

@Component({
	selector: 'authentication_selector',
	template: '<h1>Login</h1>',
	// styleUrls: ['app/hero-detail.component.css'],
	directives: [
    	ROUTER_DIRECTIVES,
    ],
})

export class AuthenticationComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
					 	
		this.setRXJSListeners();
		
	}

	setRXJSListeners() {

		this.authService.getLogged(null).subscribe((user: Object) => {
        	console.log("uepa");
        	this.router.navigate(['/open-project']);

     	});

	}

}