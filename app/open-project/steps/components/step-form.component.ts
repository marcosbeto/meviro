import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';

@Component({
	selector: 'new-step',
	templateUrl: 'app/open-project/steps/templates/step-form.component.html',
})

export class StepFormComponent implements OnInit {

	model: Step;

	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute) {

		this.model = new Step(null, null, null, null);


	}

	ngOnInit() {	

		// let project_id = this._routeParams.url._value[1].path;
		// console.log('project_id');
		// console.log(project_id);
		
		// this.model = new Step(null, null, null, parseInt(project_id, 10));

		// this._routeParams.params.subscribe(params => {
	 //      let id = Number.parseInt(params['id']);
	 //      if (id) {
	 //      	if (action=="delete")
	 //      		this.deleteProject(id);
	 //      	else
	 //      		this.getProjectDetail(id);
	 //      }
	      	
	 //    });

	}

	saveStep() {
		console.log(this.model);
		this.stepService.saveStep(this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
			}
		);
	}

	// getProjectDetail(id: number) { 
	// 	this.openProjectService.getProjectDetail(id, this.authService.headers)
	// 		.subscribe(result => { 
	// 			this.model = result;
	// 			console.log(this.model);
	// 		}
	// 	);
	// }

	// deleteProject(id: number) {
	// 	this.openProjectService.deleteProject(id, this.authService.headers)
	// 		.subscribe(result => { 
	// 			console.log("apagado");
	// 			this.router.navigate(['/open-project']);
				
	// 		}
	// 	);
	// }
	
	
}