import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 

@Component({
    selector: 'landing-outlet',
    directives: [
    	ROUTER_DIRECTIVES,
    ],
    templateUrl: 'app/templates/landing.component.html',
    styles: [`
     .landing_background_color 
     	{ 
     		background-color: #4aa81c; 
     		background-image: url('app/templates/images/multiple_hands_bg.png');
     		padding-top:39px;padding-bottom:55px;
     		z-index:1;

    	}
     `]
})

export class LandingComponent {}
