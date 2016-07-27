import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';
import { PhotoService } from '../photos/services/photo.service';
import { StepFormComponent } from '../components/step-form.component';


@Component({
	selector: 'list-steps',
	templateUrl: 'app/open-project/steps/templates/step.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		StepFormComponent
	],
	providers: [AuthService]
})

export class StepComponent implements OnInit{

	title = "STEP COMPONENT";

	public steps: Step[]; //will be imported by its child StepFormComponent
	public project_id: number; //will be imported by its child StepFormComponent
	@Input() projectId: number; //recieved by its parent OpenProjectForm
	
	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute) {
	}

	ngOnInit() {	
		this.project_id = this.projectId;
		if (this.project_id) {
			this.getSteps(this.project_id);
		}
	}

	getSteps(open_project_id: number) { 
		this.stepService.getSteps(open_project_id, this.authService.headers)
			.subscribe(result => { 
				this.steps = result;
			}
		);
	}

	addNewStepToArray_Listener(event:any) {
    	this.steps.push(event.step);
  	}
	
}