import { Component, EventEmitter, Input, OnInit, Output, DoCheck, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { PhotoService } from '../steps/photos/services/photo.service';
import { AuthService } from '../../auth/services/auth.service';
import { FilterBarComponent } from './filter-bar.component'


@Component({
	// selector: 'open-project-list',
	templateUrl: 'app/open-project/templates/open-project-list.component.html',
	directives: [
        ROUTER_DIRECTIVES,
        FilterBarComponent
    ],
    providers:  [PhotoService]
	
})

export class OpenProjectListComponent implements  OnInit, OnChanges {

	projects: OpenProject[] = [];
	selectedProject: OpenProject;
	title:string;
	page = 1;
	totalCountOfProjecs = 0;
	category = 0;
	idle = false;

	@Input() categorySelected:any; 
	@ViewChild('allProjectsDiv') input:any;  
	@ViewChild('filterBar') filterBar:any;   

	constructor(
		private openProjectService: OpenProjectService,
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService) {
	}

	ngOnInit() {					 	
		this.getProjects();
		this.page = 1;
		this.category = 0;
		console.log(this.filterBar.selectedCategory.id);
	}
    
    onScroll(event:any) {
    	let currentPosition = event.srcElement.scrollingElement.scrollTop;
    	let containerHeight = document.getElementById("allProjectsDiv").offsetHeight;

    	// TODO: LAZY LOADING
    	// if ((containerHeight - currentPosition)<200 && !this.idle && this.projects.length < this.totalCountOfProjecs) {
    	// 	this.page = this.page + 1;
    	// 	// console.log("tentando");
    	// 	this.getProjects();
    	// }

    	// console.log(containerHeight);
    	// console.log("----")
    	// console.log(currentPosition);
    	// console.log("****")
    	
    }

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		if (this.categorySelected) {
			this.category = this.categorySelected['id'];
			this.clearProjectsData();
			this.getProjects();
		}
	}

	clearProjectsData() {
		this.projects = [];
		this.page = 1;
		this.totalCountOfProjecs = 0;
	}

	getProjects() {

		this.idle = true;

		let myProjectsUrl = "/open-project";

		if (this.authService.user && this.router.url.indexOf(myProjectsUrl) != -1)
			this.title = "Meus Projetos"

		if (this.router.url == "/")
			this.openProjectService.setApiUrls(null, true);

		this.openProjectService.getProjects(this.authService.headers, this.page, this.category)
			.subscribe(res => { 
				for (let i=0;i<res.length;i++)
					this.projects.push(res[i]);
				this.totalCountOfProjecs = this.openProjectService.countProjects;
				this.idle = false;
			});
	}

	onSelectCategory(categorySelected:any) {
        this.category = categorySelected.id;
        this.clearProjectsData();
        this.getProjects();
    }

}