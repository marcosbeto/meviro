import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

import { AuthService } from '../../../../auth/services/auth.service';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { PhotoFormComponent } from '../components/photo-form.component';


@Component({
	selector: 'list-photos',
	templateUrl: 'app/open-project/steps/photos/templates/photo.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		Dragula,
		PhotoFormComponent
	],
	viewProviders: [DragulaService]

})

export class PhotoComponent implements OnInit, DoCheck{

	title = "Photo COMPONENT";

	public photos: Photo[]; 
	
	@Input() stepId: number; //recieved by its parent OpenProjectForm
	@Input() projectId: number;
	public project_id: number;
	public step_id: number; //will be imported by its child StepFormComponent

	
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

	ngDoCheck() { //when modal is opened more than one time, we need to upload those values 
	    this.project_id = this.projectId;
		this.step_id = this.stepId;
	}


	getPhotos(step_id: number) { 
		this.photoService.getPhotos(step_id, this.authService.headers)
			.subscribe(result => { 
				this.photos = result;
			}
		);
	}

	addNewPhotoToArray_Listener(event:any) {
    	// this.photos.push(event.photo);

    	let counter = 0;
    	let position = 0;
    	let updating = false;
    	this.photos.filter(photo => {
    			if (photo.id == event.photo.id) {
    				updating = true;
    				position = counter;
    			} 
    			counter++;
    			return true;
    		})[0];

    	if (event.action=="delete") { 
    		this.photos.splice(position, 1);    		
    	} else {
    		if (updating) {
    			this.photos[position] = event.photo;    			
    		} else {
    			this.photos.push(event.photo);
    		}
    	}


  	}

  	ngOnChanges(changes:any) { //this is important to get the value of the current step
  		this.step_id = changes.stepId.currentValue;
  		if (this.step_id)
			this.getPhotos(this.step_id);
  	}
	
}