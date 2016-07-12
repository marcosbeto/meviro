import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	templateUrl: 'app/open-project/templates/open-project-form.component.html',
})

export class OpenProjectFormComponent implements OnInit {

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService) {
	}

	ngOnInit() {					 	
	}

	
	
}