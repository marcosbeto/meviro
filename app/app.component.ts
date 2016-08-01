import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 
import { HeaderComponent } from './header.component'
import { LandingComponent } from './landing.component'
import { FilterBarComponent } from './filter-bar.component'
import { MetaDataComponent } from './meta-data.component'
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'my-app',
    providers: [ //Those are the classes that will PROVIDE services for the rest of the app
		AuthService,
		OpenProjectService,
	], 
    directives: [
    	ROUTER_DIRECTIVES,
    	HeaderComponent,
        LandingComponent,
        FilterBarComponent,
        MetaDataComponent, 
        AlertComponent
    ],
    templateUrl: 'app/templates/app.component.html',
})


export class AppComponent { 

	logo_header = "app/templates/images/logo_horizontal.png";
	//;padding-top:39px;padding-bottom:55px;z-index:1;background-image: url('{{ STATIC_URL }}images/multiple_hands_bg_white.png');
	
	title = "shit";

	constructor(private authService: AuthService, private router:Router) {
	
	} 

}
