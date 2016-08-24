import { Component, EventEmitter, Input, OnInit, Output, DoCheck, ViewChild, NgZone, OnChanges } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';
import { PhotoService } from '../photos/services/photo.service';
import { OpenProjectService } from '../../services/open-project.service';
import { StepFormComponent } from '../components/step-form.component';
import { PhotoPublicListComponent } from '../photos/components/photo-public-list.component';

@Component({
	selector: 'public-list-steps',
	templateUrl: 'app/open-project/steps/templates/step-public-list.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		DND_DIRECTIVES,
		CollapseDirective,
		PhotoPublicListComponent,
	],
	providers: [AuthService, PhotoService],
})

export class StepPublicListComponent implements OnInit{

	public steps: Step[]; //will be imported by its child StepFormComponent
	public isStepsCollapsed: boolean[] = [];
	public project_id: number; //will be imported by its child StepFormComponent
	@Input() projectId: number; //recieved by its parent OpenProjectForm
	@Input() projectTitle: string; //recieved by its parent OpenProjectForm
	@Input() projectDescription: string; //recieved by its parent OpenProjectForm

	project_title:string;
	project_abstract:string;
	
	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute, 
		private openProjectService:OpenProjectService,
		zone: NgZone) {

	}
	
	ngOnInit() {	
		// this.project_id = this.projectId;
		// console.log("simba");
		this.project_id = this._routeParams.params['_value']['id']; 
		if (this.project_id) {
			this.getSteps(this.project_id);
		}

		this.openProjectService.getProjectDetail(this.project_id, true, this.authService.headers)
			.subscribe(result => { 
				this.project_title = result.title;
				this.project_abstract = result.abstract

			}
		);


	}

	getSteps(open_project_id: number) { 
		this.stepService.getSteps(open_project_id, true, this.authService.headers)
			.subscribe(result => { 
				this.steps = result;
				for (let i in result) {
				   this.isStepsCollapsed.push(false);
				}
			}
		);
	}

	
}