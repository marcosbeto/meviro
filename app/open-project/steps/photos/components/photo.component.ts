import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../auth/services/auth.service';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { PhotoFormComponent } from '../components/photo-form.component';


@Component({
	selector: 'list-photos',
	templateUrl: 'app/open-project/steps/photos/templates/photo.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		PhotoFormComponent
	],

})

export class PhotoComponent implements OnInit{

	title = "Photo COMPONENT";

	public photos: Photo[]; 
	public step_id: number; //will be imported by its child StepFormComponent
	@Input() stepId: number; //recieved by its parent OpenProjectForm
	@Input() projectId: number;
	public project_id: number;

	
	constructor(
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute) {
	}

	ngOnInit() {	

		this.project_id = this.projectId;

		this.step_id = this.stepId;
		if (this.step_id) {
			this.getPhotos(this.step_id);
		}
	}

	getPhotos(open_project_id: number) { 
		this.photoService.getPhotos(open_project_id, this.authService.headers)
			.subscribe(result => { 
				this.photos = result;
			}
		);
	}

	addNewPhotoToArray_Listener(event:any) {
    	this.photos.push(event.photo);
  	}
	
}