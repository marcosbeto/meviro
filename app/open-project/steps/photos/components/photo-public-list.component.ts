import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone} from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';


import { AuthService } from '../../../../auth/services/auth.service';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { PhotoFormComponent } from '../components/photo-form.component';


@Component({
	selector: 'public-list-photos',
	templateUrl: 'app/open-project/steps/photos/templates/photo-public-list.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		DND_DIRECTIVES,
		PhotoFormComponent,
		NgClass
	]
})

export class PhotoPublicListComponent implements OnInit {

	title = "Photo COMPONENT";

	public photos: Photo[]; 
	
	@Input() stepId: number; //recieved by its parent OpenProjectForm
	@Input() projectId: number;
	public project_id: number;
	public step_id: number; //will be imported by its child StepFormComponent
	public isPhotosContainerExpanded:boolean = false;

	@Output() mainPhotoChange = new EventEmitter();

	
	constructor(
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute) {



	}

	isNewRow(i:number) { //todo: create generic service for this

		let base:number = 0;
		base = Math.floor( (i/6) );

		if (0 + (6*base) == i ||
				(1 + (6*base) == i && i == this.photos.length - 1)  ||
					5 + (6*base) == i) {
			return true;
		}
			
		
		return false;
	}

	isNewCol(i:number, type_col:string) { //todo: write documentation to explain this mess

		let base =  Math.floor((i/6));
		let position = i - (6*base);
		let number_of_iterations = Math.floor(this.photos.length / 6) + 1;
		let size_array_current_iteration = 6;
		if (base==number_of_iterations-1) 
			size_array_current_iteration = 6 - ((6*number_of_iterations) - this.photos.length);

		if (position==0 && type_col=='col-12') {
			return true;
		} 
		else if (position==1) {
			if (position+1 == size_array_current_iteration && type_col=='col-12') {
				return true;
			}
			else if ((position+2 == size_array_current_iteration || position+4 == size_array_current_iteration || position+5 == size_array_current_iteration) 
						&& type_col=='col-6') 
				return true;
			else if (position+3 == size_array_current_iteration && type_col=='col-4')
				return true;
		} 
		else if (position==2) {
			if ((position+1 == size_array_current_iteration || position+3 == size_array_current_iteration || position+4 == size_array_current_iteration) && type_col=='col-6')
				return true;
			else if (position+2 == size_array_current_iteration && type_col=='col-4')
				return true;
		} 
		else if (position==3) {
			if (position+2 == size_array_current_iteration && type_col=='col-6') 
				return true;
			else if ((position+1 == size_array_current_iteration || position+3 == size_array_current_iteration) && type_col=='col-4')
				return true;
		} 
		else if (position==4) {
			if (position+1 == size_array_current_iteration && type_col=='col-6') 
				return true;
			else if (position+2 == size_array_current_iteration && type_col=='col-4')
				return true;
		} 
		else if (position==5) {
			if (position+1 == size_array_current_iteration && type_col=='col-4')
				return true;
		} 

		return false;











		
		// --
		// --
		// --
		// col-4
		// col-6
		// i(0) + 1 == this.photos.length
		// i(1)  + 3 == this.photos.length
		// i(1)  + 4 == this.photos.length
		// i(1)  + 5 == this.photos.length
		// i(1) + 1 == this.photos.length
		// i(1) + 2 == this.photos.length
		// i(2)  + 2 == this.photos.length
		// i(2)  + 3 == this.photos.length
		// i(2)  + 4 == this.photos.length
		// i(2) + 1 == this.photos.length
		// i(3)  + 1 == this.photos.length
		// i(3)  + 3 == this.photos.length
		// i(3) + 2 == this.photos.length
		// i(4)  + 2 == this.photos.length
		// i(4) + 1 == this.photos.length
		// i(5)  + 1 == this.photos.length
	}



	ngOnInit() {	

		this.project_id = this.projectId;
		this.step_id = this.stepId;

		if (this.step_id) {
			this.getPhotos(this.step_id);
		}
	}


	getPhotos(step_id: number) { 
		this.photoService.getPhotos(step_id, true, this.authService.headers)
			.subscribe(result => { 
				this.photos = result;
			}
		);
	}

	
	
}