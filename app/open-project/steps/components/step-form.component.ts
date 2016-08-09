import { Component, EventEmitter, Input, OnInit, Output, DoCheck, ViewChild} from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';


import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';
import { PhotoService } from '../photos/services/photo.service';
import { PhotoComponent } from '../photos/components/photo.component';

@Component({
	exportAs: 'stepForm',
	selector: 'new-step',
	templateUrl: 'app/open-project/steps/templates/step-form.component.html',
	directives: [
		MODAL_DIRECTIVES,
		PhotoComponent
	],
	viewProviders:[BS_VIEW_PROVIDERS],
	providers: [PhotoService]
})

export class StepFormComponent implements OnInit {

	@Input() stepsArray: Step[];
	@Output() stepsListChange = new EventEmitter();
	@Input() projectId: number;
	@ViewChild('addNewStepModal') addNewStepModal: any; //<== reference to Modal directive
  	
	public step_id: number;
	public project_id: string;
	action: string;
	model: Step;

	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute
		) {

		this.model = new Step(null, null, null, null, null);

	}

	ngOnInit() {	
		
		if (this.projectId)
			this.model = new Step(null, null, null, null, this.projectId);
	}

	saveStep(project_id:number) {

		let updating = false;
		if (this.model.id)
			updating = true;

		this.stepService.saveStep(project_id, this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.stepsListChange.emit({
			      step: this.model,
			      action: 'saveUpdate'
			    });
			    if (!updating)
					this.model = new Step(null, null, null, null, project_id); //reseting step form
			}
		);
	}

	openModal(action:string, project_id:number, step_id: number, openModal:boolean, model:any) {
		
		this.action = action;
		this.step_id = step_id;

		if (action=='updateStep') {
			this.getStepDetail(project_id, step_id, openModal);
		} else if (action=="newStep") {
			this.model = new Step(null, null, null, null, project_id);
			this.addNewStepModal.show(); 
		} else if (action=="addPhoto") {
			this.model = model;
			this.addNewStepModal.show();
		}
	}

	getStepDetail(project_id:number, step_id: number, openModal:boolean) { 
		// this.model = null;
		this.stepService.getStepDetail(project_id, step_id, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.step_id = this.model.id;

				if (openModal)
					this.addNewStepModal.show(); 

			}
		);
	}

	deleteStep(project_id:number, step_id: number) {

		this.stepService.deleteStep(project_id, step_id, this.authService.headers)
			.subscribe(result => { 
				this.model = new Step(step_id, null, null, null, project_id); //reseting step form
				this.stepsListChange.emit({
			      step: this.model,
			      action: 'delete'
			    });
			}
		);
	}

}