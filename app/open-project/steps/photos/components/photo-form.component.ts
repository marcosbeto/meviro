import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';


import { AuthService } from '../../../../auth/services/auth.service';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { OpenProject } from '../../../models/open-project.model';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';

@Component({
	exportAs: 'photoForm',
	selector: 'new-photo',
	templateUrl: 'app/open-project/steps/photos/templates/photo-form.component.html',
	providers: [PhotoService],
	directives: [UPLOAD_DIRECTIVES]
})

export class PhotoFormComponent implements OnInit, DoCheck {

	@Input() photosArray: Photo[];
	@Output() photosListChange = new EventEmitter();

	@Input() stepId: number;
	@Input() projectId: number;

	zone: NgZone;

	model: Photo;
	project_id: string;

	uploadedFiles: any[] = [];
  	options: Object = {
    	url: 'http://localhost:8000/upload'
  	};

	constructor(
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute,
		zone: NgZone,
		) {

		this.zone = zone;
		this.model = new Photo(null, null, null, null, null, null, null);

	}

	handleUpload(stepId: string, projectId: string, data:any): void {

		if (data && data.response) {
			data = JSON.parse(data.response);
			this.uploadedFiles.push(data);
			this.model = data;

			data.file = (data.file.substring(data.file.indexOf('static'));
			
			this.photosListChange.emit({
		      photo: this.model
		    });
		}
	}

	ngOnInit() {	
		
		if (this.stepId)
			this.model = new Photo(null, null, null, null, null, null, this.stepId);

		this.options.url = "http://localhost:8000/upload/projects/"+ this.projectId + "/step/" + this.stepId + "/";		
		
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

	ngDoCheck() { //when modal is opened more than one time, we need to upload those values 

	     this.zone.run(() => {
        
      }); 
		
		this.options.url = "http://localhost:8000/upload/projects/"+ this.projectId + "/step/" + this.stepId + "/";	
	}

	savePhoto(step_id:number) {

		let updating = false;
		if (this.model.id)
			updating = true;

		this.photoService.savePhoto(step_id, this.model, this.authService.headers)
			.subscribe(result => { 
				console.log(result);
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
				this.model = new Photo(photo_id, null, null, null, step_id); //reseting step form
				this.photosListChange.emit({
			      photo: this.model,
			      action: 'delete'
			    });
			}
		);
	}

	

	// deleteStep(project_id:number, step_id: number) {

	// 	this.stepService.deleteStep(project_id, step_id, this.authService.headers)
	// 		.subscribe(result => { 
	// 			this.model = new Step(step_id, null, null, null, project_id); //reseting step form
	// 			this.stepsListChange.emit({
	// 		      step: this.model,
	// 		      action: 'delete'
	// 		    });
	// 		}
	// 	);
	// }

	


	
	
}