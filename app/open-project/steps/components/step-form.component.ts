import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';
import { PhotoService } from '../photos/services/photo.service';
import { PhotoComponent } from '../photos/components/photo.component';

@Component({
	selector: 'new-step',
	templateUrl: 'app/open-project/steps/templates/step-form.component.html',
	directives: [
		PhotoComponent
	],
	providers: [PhotoService]
})

export class StepFormComponent implements OnInit {

	@Input() stepsArray: Step[];
	@Output() stepsListChange = new EventEmitter();
	@Input() projectId: number;

	public step_id: number;

	model: Step;
	public project_id: string;

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

		this._routeParams.params.subscribe(params => {
	      let step_id = Number.parseInt(params['step_id']); //getting the id of the project 

	      if (step_id && this._routeParams.url['_value'][1] && this._routeParams.url['_value'][3]) { //if an `id` is presented at the URL 
	      
      		let action = this._routeParams.url['_value'][3].path;
      		let project_id = this._routeParams.url['_value'][1].path;

	      	if (action=="delete") 
	      		this.deleteStep(project_id, step_id);
	      	else 
	      		this.getStepDetail(project_id, step_id);
	      	
	      }
	    });
		
	}

	saveStep(project_id:number) {

		let updating = false;
		if (this.model.id)
			updating = true;

		this.stepService.saveStep(project_id, this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.step_id = this.model.id;
				this.stepsListChange.emit({
			      step: this.model
			    });
			    if (!updating)
					this.model = new Step(null, null, null, null, this.projectId); //reseting step form
			}
		);
	}

	getStepDetail(project_id:number, step_id: number) { 
		this.stepService.getStepDetail(project_id, step_id, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.step_id = this.model.id;
			}
		);
	}

	deleteStep(project_id:number, step_id: number) {

		this.stepService.deleteStep(project_id, step_id, this.authService.headers)
			.subscribe(result => { 
				console.log("apagado");
				this.router.navigate(['/open-project/update/' + project_id + '/']);				
			}
		);
	}
	
	
}