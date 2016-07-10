import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	templateUrl: 'app/open-project/templates/open-project.component.html',
	// styleUrls: ['app/hero-detail.component.css'],
})

export class OpenProjectComponent implements  OnInit {

	title = "OpenProject Begins!"

	projects: OpenProject[];
	selectedProject: OpenProject;

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService) {
	}

	ngOnInit() {					 	
		if (this.authService.authenticated()) {
			this.getProjects();
		}
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
        	this.router.navigate(['/login']);
     	});
	}

	getProjectDetail(id: number) { 
		this.openProjectService.getProjectDetail(id, this.authService.headers)
			.subscribe(res => { 
				this.selectedProject = res;
			}
		);
	}



	
}