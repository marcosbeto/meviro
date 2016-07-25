import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { StepComponent } from '../steps/components/step.component';
import { StepFormComponent } from '../steps/components/step-form.component'
import { StepService } from '../steps/services/step.service';;


@Component({
	templateUrl: 'app/open-project/templates/open-project-form.component.html',
	directives: [
		StepComponent,
		StepFormComponent
	],
	providers:  [StepService]
})

export class OpenProjectFormComponent implements OnInit {

	model: OpenProject;

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute,
		private stepService: StepService) {

		this.model = new OpenProject(null, null, this.authService.metauser_id, null, null, null, null, null, null);


	}

	ngOnInit() {	

		let action = this._routeParams.url._value[0].path;
		
		this._routeParams.params.subscribe(params => {
	      let id = Number.parseInt(params['id']);
	      if (id) {
	      	if (action=="delete")
	      		this.deleteProject(id);
	      	else
	      		this.getProjectDetail(id);
	      }
	      	
	    });

	}

	saveProject() {
		this.openProjectService.saveProject(this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
			}
		);
	}

	getProjectDetail(id: number) { 
		this.openProjectService.getProjectDetail(id, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				console.log(this.model);
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