import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
// import { MetaService, MetaConfig } from 'ng2-meta';

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
	getLoggedOutVar: any;
	errorMessage: any;

	ngOnInit() {
		this.setRXJSListeners();
	}

	ngOnDestroy() {
		// console.log("destroy");
		this.getLoggedVar.unsubscribe();
		this.getLoggedOutVar.unsubscribe();
	}

	setRXJSListeners() {
		console.log("adicionando");
		// --- Listening for login action --- //
		this.getLoggedVar = this.authService.getLogged(null)
								.subscribe((user: Object) => {   
								console.log("user");     	
						           	// --- Checking if the meta user already exists --- //
									this.authService.isRegistered(this.authService.user)
										.subscribe(isRegisteredResult => { 
											console.log('isRegisteredResult');
											console.log(isRegisteredResult);
											if (!isRegisteredResult) {
												this.addNewUser();	
											} else {
												this.router.navigate(['/open-project']);
											}
										},
										error =>  {
											this.errorMessage = <any>error;
									});
						     	}, 
						     		// --- ./Checking if the meta user already exists --- //
						     	error =>  {
									this.errorMessage = <any>error;
								});
		// --- ./Listening for login action --- // 

		this.getLoggedOutVar = this.authService.getLoggedOut(null)
								.subscribe(result => {
									this.router.navigate(['/login']);
								});
	}

	addNewUser() {
		console.log("addding");
		// --- Saving New Meta User --- //
		this.authService.saveMetaUser(this.authService.user)
			.subscribe(metaUserIdResult => { 
				// --- Add Metadata to Auth0 User --- //	
					this.authService.updataUserMetadata(metaUserIdResult, this.authService.user)
						.subscribe(
							updataUserMetadataResult => { 
								this.router.navigate(['/open-project']);
							}
						);
				// --- ./Add Metadata to Auth0 User --- //		
			},
			error =>  {
				this.errorMessage = <any>error;
			});
		// --- ./Saving New Meta User --- //
	}

}