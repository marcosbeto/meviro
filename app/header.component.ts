import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 

@Component({
    selector: 'header-outlet',
    providers: [ //Those are the classes that will PROVIDE services for the rest of the app
		AuthService,
	], 
    directives: [
    	ROUTER_DIRECTIVES,
    ],
    templateUrl: 'app/templates/header.component.html',
})


export class HeaderComponent { 

	logo_header = "app/templates/images/logo_horizontal.png";
	//;padding-top:39px;padding-bottom:55px;z-index:1;background-image: url('{{ STATIC_URL }}images/multiple_hands_bg_white.png');
	
	constructor(private authService: AuthService, private router:Router) {
		this.setRXJSListeners();
	} 

	setRXJSListeners() {
     	this.authService.getLoggedOut(null).subscribe((user: Object) => {
       		this.router.navigate(['/login']);
     	});
 	}

}
