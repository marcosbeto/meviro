import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	templateUrl: 'app/open-project/templates/open-project-list.component.html',
	directives: [
        ROUTER_DIRECTIVES
    ]
	
})

export class OpenProjectListComponent implements  OnInit {

	title = "Projects LIST:"

	projects: OpenProject[];
	selectedProject: OpenProject;

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService) {
	}

	ngOnInit() {					 	
		this.getProjects();
		this.setRXJSListeners();		
	}

	getProjects() {
		this.openProjectService.getProjects(this.authService.headers)
			.subscribe(res => { 
				this.projects = res;
			}
		);
	}

	setRXJSListeners() {
		this.authService.getLogged(null).subscribe((user: Object) => {
        	this.getProjects();
     	});

     	this.authService.getLoggedOut(null).subscribe((user: Object) => {
        	this.projects = null;
     	});
 	}
	
}