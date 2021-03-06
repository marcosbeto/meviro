import { Component, EventEmitter, Input, OnInit, Output, DoCheck, ViewChild, NgZone, OnChanges } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';

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
		DND_DIRECTIVES,
		CollapseDirective,
		StepFormComponent
	],
	providers: [AuthService],
})

export class StepComponent implements OnInit{

	public steps: Step[]; //will be imported by its child StepFormComponent
	public isStepsCollapsed: boolean[] = [];
	public project_id: number; //will be imported by its child StepFormComponent
	@Input() projectId: number; //recieved by its parent OpenProjectForm
	
	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute, 
		private zone: NgZone) {

	}
	
	updatePosition($event:any) {
		for (let i=0; i<this.steps.length; i++){
			this.steps[i].position=i;
			this.stepService.saveStep(this.steps[i].project, this.steps[i], this.authService.headers)
				.subscribe(result => { 
					this.steps[i]=result;
					this.isStepsCollapsed[i] = false;
				}
			);
		}
	}

	ngOnInit() {	
		this.project_id = this.projectId;
		if (this.project_id) {
			this.getSteps(this.project_id);
		}
	}

	getSteps(open_project_id: number) { 
		this.stepService.getSteps(open_project_id, false, this.authService.headers)
			.subscribe(result => { 
				this.steps = result;
				for (let i in result) {
				   this.isStepsCollapsed.push(false);
				}
			}
		);
	}

	addStepToArray_Listener(event:any) {
    	
    	let counter = 0;
    	let position = 0;
    	let updating = false;
    	
    	this.steps.filter(step => {
    			if (step.id == event.step.id) {
    				updating = true;
    				position = counter;
    			} 
    			counter++;
    			return true;
    		})[0];

    	if (event.action=="delete") { 
    		this.steps.splice(position, 1);    		
    	} else {
    		if (updating) {
    			this.steps[position] = event.step;    			
    		} else {
    			this.steps.push(event.step);
    		}
    	}
  	}

	
}