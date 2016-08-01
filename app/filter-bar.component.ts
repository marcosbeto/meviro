import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { OpenProjectService } from './open-project/services/open-project.service'; 

@Component({
    selector: 'filter-bar-outlet',
    directives: [
    	ROUTER_DIRECTIVES,
    ],
    templateUrl: 'app/templates/filter-bar.component.html',
})

export class FilterBarComponent {}
