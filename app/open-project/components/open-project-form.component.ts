import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES} from '@angular/common';

import { AuthService } from '../../auth/services/auth.service';
import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { StepComponent } from '../steps/components/step.component';
import { StepFormComponent } from '../steps/components/step-form.component'
import { StepService } from '../steps/services/step.service';
import { PhotoService } from '../steps/photos/services/photo.service';

import { AppSettings } from '../../app.settings'


@Component({
	templateUrl: 'app/open-project/templates/open-project-form.component.html',
	directives: [
		StepComponent,
		DROPDOWN_DIRECTIVES
	],
	providers:  [StepService, PhotoService]
})

export class OpenProjectFormComponent implements OnInit {

	public project_id: number;
	model: OpenProject;	
	action: string;
	categories = AppSettings.ALL_CATEGORIES;
	selectedCategory: {} = {'id':0, 'name':'Selecione uma categoria'};

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute,
		private stepService: StepService
		) {
		//starting a new model that will be populated by a specific user
		this.model = new OpenProject(null, null, null, null, null, null, null, null, null, localStorage.getItem('profile.api_user_id')); 

	}

	ngOnInit() {	

		let action = this._routeParams.url['_value'][0]['path']; //extracting from the URL the action that will be executed
		this._routeParams.params.subscribe(params => {
	      let id = Number.parseInt(params['id']); //getting the id of the project 
	      if (id) { //if an `id` is presented at the URL 
	      	if (action=="delete")
	      		this.deleteProject(id);
	      	else
	      		this.getProjectDetail(id);
	      }
	    });

		if (this.router.url.indexOf("add") !== -1)
			this.action = "add_phase_1";
		else
			this.action = "update";

	}

	
	dropdownSetup(category:any) {

		this.selectedCategory = category;
		this.model.category = category.id;

	}

	saveProject() {
		this.openProjectService.saveProject(this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.project_id = this.model.id;
				this.action = "add_phase_2";
			}
		);
	}

	getProjectDetail(id: number) { 
		this.openProjectService.getProjectDetail(id, false, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.project_id = this.model.id;

				this.selectedCategory = this.categories.filter(category => {
					if (category['id'] == this.model.category) {
						return true;
					} 
					return false;
				})[0];

				if (!this.selectedCategory)
					this.selectedCategory = {'id':0, 'name':'Selecione uma categoria'};

			}
		);
	}

	deleteProject(id: number) {
		this.openProjectService.deleteProject(id, this.authService.headers)
			.subscribe(result => { 
				console.log("apagado");
				this.router.navigate(['/open-project']);
				
			}
		);
	}
	
	
}