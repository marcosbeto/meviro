import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { StepComponent } from '../steps/components/step.component';
import { StepFormComponent } from '../steps/components/step-form.component'
import { StepService } from '../steps/services/step.service';
import { PhotoService } from '../steps/photos/services/photo.service';


@Component({
	templateUrl: 'app/open-project/templates/open-project-form.component.html',
	directives: [
		StepComponent,
	],
	providers:  [StepService, PhotoService]
})

export class OpenProjectFormComponent implements OnInit {

	public project_id: number;
	model: OpenProject;	
	action: string;

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute,
		private stepService: StepService
		) {
		//starting a new model that will be populated by a specific user
		this.model = new OpenProject(null, null, null, null, null, null, null, null, localStorage.getItem('profile.api_user_id')); 

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
		this.openProjectService.getProjectDetail(id, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.project_id = this.model.id;
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