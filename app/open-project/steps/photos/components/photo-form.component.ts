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

export class PhotoFormComponent implements OnInit, DoCheck { //todo: delete this component because its not being used

	@Input() photosArray: Photo[];
	@Output() photosListChange = new EventEmitter();

	@Input() stepId: number;
	@Input() projectId: number;

	

	model: Photo;
	project_id: string;

	uploadedFiles: any[] = [];
  	options: Object = {
    	url: 'http://localhost:8000/upload',
    	// withCredentials: true,
    	authToken: localStorage.getItem('id_token'),
    	authTokenPrefix: "JWT" // required only if different than "Bearer"
  	};

	constructor(
		private photoService: PhotoService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute,
		private zone: NgZone
		) {

		this.model = new Photo(null, null, null, null, null, null);

	}

	onChange() {
		console.log("eita");
	}

	getEvent(event:any) {
		console.log(event.files = null);
	}

	handleUpload(stepId: string, projectId: string, data:any): void {


		if (data && data.response) {
			data = JSON.parse(data.response);
			this.uploadedFiles.push(data);
			this.model = data;
			this.model.file = data.file.substring(data.file.indexOf('static'),data.file.length); //todo: understand why the path of image is complete, including localhost

			this.photosListChange.emit({
		      photo: this.model
		    });
		}
	}

	ngOnInit() {	
		if (this.stepId)
			this.model = new Photo(null, null, null, null, this.stepId, null);
		this.options['url'] = "http://localhost:8000/upload/projects/"+ this.projectId + "/step/" + this.stepId + "/";
		console.log("reiniciando");
	}

	ngDoCheck() { //when modal (add photo modal) is opened more than one time, we need to upload those values 
		this.zone.run(() => {
		});
		console.log("checando");
		this.options['url'] = "http://localhost:8000/upload/projects/"+ this.projectId + "/step/" + this.stepId + "/";	

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
				this.model = new Photo(photo_id, null, null, null, step_id, null); //reseting step form
				this.photosListChange.emit({
			      photo: this.model,
			      action: 'delete'
			    });
			}
		);
	}
	
}