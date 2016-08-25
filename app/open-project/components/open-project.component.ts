import { Component, EventEmitter, Input, OnInit, Output, DoCheck, OnChanges, SimpleChange } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { StepComponent } from '../steps/components/step.component';
import { AuthService } from '../../auth/services/auth.service';
import { OpenProjectListComponent } from './open-project-list.component'; 

@Component({
	// selector: 'open-project',
	templateUrl: 'app/open-project/templates/open-project.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		OpenProjectListComponent
	],
 	providers:  [OpenProjectService]
	// styleUrls: ['app/hero-detail.component.css'],
})

export class OpenProjectComponent implements  OnChanges{

	title = "Projects HQ";

	projects: OpenProject[];
	selectedProject: OpenProject;

	@Input() categorySelected:any;
	category:number;

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService) {
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if (this.categorySelected) {
			this.category = this.categorySelected['id'];
			console.log(this.category);
			
		}
	}

}