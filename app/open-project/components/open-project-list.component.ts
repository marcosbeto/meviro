import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { PhotoService } from '../steps/photos/services/photo.service';
import { AuthService } from '../../auth/services/auth.service';


@Component({
	templateUrl: 'app/open-project/templates/open-project-list.component.html',
	directives: [
        ROUTER_DIRECTIVES,

    ],
    providers:  [PhotoService]
	
})

export class OpenProjectListComponent implements  OnInit {

	projects: OpenProject[];
	selectedProject: OpenProject;
	title:string;

	constructor(
		private openProjectService: OpenProjectService,
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService) {
	}

	ngOnInit() {					 	
		this.getProjects();
	}

	getProjects() {

		let myProjectsUrl = "/open-project";

		if (this.authService.user && this.router.url.indexOf(myProjectsUrl) != -1)
			this.title = "Meus Projetos"

		if (this.router.url == "/")
			this.openProjectService.setApiUrls(null, true);

		this.openProjectService.getProjects(this.authService.headers)
			.subscribe(res => { 
				this.projects = res;
			});
	}

}