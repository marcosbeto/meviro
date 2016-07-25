import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { StepComponent } from '../steps/components/step.component';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	templateUrl: 'app/open-project/templates/open-project.component.html',
	directives: [
		ROUTER_DIRECTIVES,
	],
 	providers:  [OpenProjectService]
	// styleUrls: ['app/hero-detail.component.css'],
})

export class OpenProjectComponent {

	title = "Projects HQ";

	projects: OpenProject[];
	selectedProject: OpenProject;

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService) {
	}

}