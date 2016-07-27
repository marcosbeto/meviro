import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

import { AuthService } from '../../../../auth/services/auth.service';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { OpenProject } from '../../../models/open-project.model';

@Component({
	selector: 'new-photo',
	templateUrl: 'app/open-project/steps/photos/templates/photo-form.component.html',
	providers: [PhotoService]
})

export class PhotoFormComponent implements OnInit {

	@Input() photosArray: Photo[];
	@Output() photosListChange = new EventEmitter();
	@Input() stepId: number;
	@Input() projectId: number;

	model: Photo;
	project_id: string;

	constructor(
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute
		) {

		this.model = new Photo(null, null, null, null, null, null, null);
	}

	ngOnInit() {	
		
		if (this.stepId)
			this.model = new Photo(null, null, null, null, null, null, this.stepId);		
		
		this._routeParams.params.subscribe(params => {
	      let photo_id = Number.parseInt(params['photo_id']); //getting the id of the project 

	      this.project_id = this._routeParams.url['_value'][1]['path'];
	      if (photo_id && this._routeParams.url['_value'][3] && this._routeParams.url['_value'][5]) { //if an `id` is presented at the URL 
	      
      		let action = this._routeParams.url['_value'][5]['path'];
      		let step_id = this._routeParams.url['_value'][3]['path'];

	      	if (action=="delete") {
	      		this.deletePhoto(step_id, photo_id);
	      	}
	      	else {
	      		this.getPhotoDetail(step_id, photo_id);
	      	}
	      }
	    });
		
	}

	savePhoto(step_id:number) {

		let updating = false;
		if (this.model.id)
			updating = true;

		this.photoService.savePhoto(step_id, this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.photosListChange.emit({
			      photo: this.model
			    });
			    if (!updating)
					this.model = new Photo(null, null, null, null, null, null, this.stepId); //reseting step form
			}
		);
	}

	getPhotoDetail(step_id:number, photo_id: number) { 
		this.photoService.getPhotoDetail(step_id, photo_id, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
			}
		);
	}

	deletePhoto(step_id:number, photo_id: number) {

		this.photoService.deletePhoto(step_id, photo_id, this.authService.headers)
			.subscribe(result => { 
				console.log("apagado");
				this.router.navigate(['/open-project/update/' + this.project_id + '/step/update/' + step_id]);				
			}
		);
	}
	
	
}