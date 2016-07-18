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

	getLoggedVar: any;
	errorMessage: any;

	ngOnInit() {
		this.setRXJSListeners();
	}

	ngOnDestroy() {
		this.getLoggedVar.unsubscribe();
	}

	setRXJSListeners() {
		// --- Listening for login action --- //
		this.getLoggedVar = this.authService.getLogged(null)
								.subscribe((user: Object) => {        	
						           	this.addNewUser();
						        	this.router.navigate(['/open-project']);
						     	}, 
						     	error =>  {
									this.errorMessage = <any>error;
								});
		// --- ./istening for login action --- //     	
	}

	addNewUser() {
		// --- Checking if the meta user already exists --- //
       	this.authService.isRegistered(this.authService.user)
			.subscribe(isRegisteredResult => { 
				if (!isRegisteredResult) {
					// --- Saving New Meta User --- //
					this.authService.saveMetaUser(this.authService.user)
						.subscribe(metaUserIdResult => { 
							// --- Add Metadata to Auth0 User --- //	
								this.authService.updataUserMetadata(metaUserIdResult, this.authService.user)
									.subscribe(
										// updataUserMetadataResult => { 
										// 	console.log("metadata updated");
										// }
									);
							// --- ./Add Metadata to Auth0 User --- //		
						},
						error =>  {
							this.errorMessage = <any>error;
						});
					// --- ./Saving New Meta User --- //
				}
			},
			error =>  {
				this.errorMessage = <any>error;
			});
		// --- ./Checking if the meta user already exists --- //
	}

}