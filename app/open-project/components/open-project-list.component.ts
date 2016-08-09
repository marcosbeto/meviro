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
	}

	getProjects() {

		if (this.router.url == "/")
			this.openProjectService.setApiUrls(null, true);

		this.openProjectService.getProjects(this.authService.headers)
			.subscribe(res => { 
				this.projects = res;
			}
		);
	}
}