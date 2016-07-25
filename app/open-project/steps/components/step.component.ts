import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';

@Component({
	selector: 'list-steps',
	templateUrl: 'app/open-project/steps/templates/step.component.html',
	directives: [ROUTER_DIRECTIVES],
 	// providers:  [StepService]
	// styleUrls: ['app/hero-detail.component.css'],
})

export class StepComponent implements OnInit{

	title = "STEP COMPONENT";

	steps: Step[];
	selectedStep: Step;

	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute) {


	}

	ngOnInit() {	

		let project_id = this._routeParams.url._value[1];

		if (project_id) {
			this.getSteps(project_id.path);
		}

	}

	getSteps(open_project_id: number) { 
		this.stepService.getSteps(open_project_id, this.authService.headers)
			.subscribe(result => { 
				console.log(result);
				this.steps = result;
			}
		);
	}

	saveStep() {
		this.stepService.saveStep(this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
			}
		);
	}

	
}