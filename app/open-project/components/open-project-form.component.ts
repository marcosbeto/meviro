import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams} from '@angular/router';

import { OpenProject } from '../models/open-project.model';
import { OpenProjectService } from '../services/open-project.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	templateUrl: 'app/open-project/templates/open-project-form.component.html',
})

export class OpenProjectFormComponent implements OnInit {

	model = new OpenProject(null, null, null, null, null, null, null, null, null);

	constructor(
		private openProjectService: OpenProjectService,
		private router: Router,
		private authService: AuthService) {


	}

	ngOnInit() {	

		this.model.metauser_id_id = this.authService.metauser_id;		

		console.log(this.router);	 	

	}

	saveProject() {
		console.log(this.model);3
		this.openProjectService.saveProject(this.model, this.authService.headers)
			.subscribe(res => { 
				this.model = res;
			}
		);
	}
	
	
}