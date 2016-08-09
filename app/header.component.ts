import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 

@Component({
    selector: 'header-outlet',
    directives: [
    	ROUTER_DIRECTIVES,
    ],
    templateUrl: 'app/templates/header.component.html',
})


export class HeaderComponent { 

	logo_header = "app/templates/images/logo_horizontal.png";
	//;padding-top:39px;padding-bottom:55px;z-index:1;background-image: url('{{ STATIC_URL }}images/multiple_hands_bg_white.png');
	getLoggedVar: any;
	getLoggedOutVar: any;
	errorMessage: any;
	
	constructor(private authService: AuthService, private router:Router) {
		this.setRXJSListeners();
	} 
	
	ngOnDestroy() {
		// console.log("destroy");
		this.getLoggedVar.unsubscribe();
		this.getLoggedOutVar.unsubscribe();
	}

	setRXJSListeners() {

     
		// --- Listening for login action --- //
		this.getLoggedVar = this.authService.getLogged(null)
								.subscribe((user: Object) => {   
						           	// --- Checking if the meta user already exists --- //
									this.authService.isRegistered(this.authService.user)
										.subscribe(isRegisteredResult => { 
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
