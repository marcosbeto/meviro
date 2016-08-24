import { Component, EventEmitter, Input, OnInit, Output, DoCheck, NgZone} from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { AuthService } from '../../../../auth/services/auth.service';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';


@Component({
	selector: 'list-photos',
	templateUrl: 'app/open-project/steps/photos/templates/photo.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		DND_DIRECTIVES,
		NgClass,
		UPLOAD_DIRECTIVES
	]
})

export class PhotoComponent implements OnInit, DoCheck {

	title = "Photo COMPONENT";

	public photos: Photo[]; 
	
	@Input() stepId: number; //recieved by its parent OpenProjectForm
	@Input() projectId: number;
	public project_id: number;
	public step_id: number; //will be imported by its child StepFormComponent

	@Output() mainPhotoChange = new EventEmitter();
	uploadedFiles: any[] = [];
	model: Photo;

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
		private zone: NgZone) {

		this.model = new Photo(null, null, null, null, null, null);

	}

	ngOnInit() {	
		this.updateDataReceivedFromParent();
		if (this.step_id) 
			this.getPhotos(this.step_id);
	}

	ngOnChanges(changes:any) { //this is important to get the value of the current step. this is called everytime the add photo button is clicked
  		this.step_id = changes.stepId.currentValue;
  		if (this.step_id)
			this.getPhotos(this.step_id);
  	}

	ngDoCheck() { //when modal is opened more than one time, we need to upload those values 
	    this.updateDataReceivedFromParent();
	}

	getPhotos(step_id: number) { 

		this.photoService.getPhotos(step_id, false, this.authService.headers)
			.subscribe(result => { 
				this.photos = result;
			}
		);
	}

	deletePhoto(step_id:number, photo_id: number) {

		this.photoService.deletePhoto(step_id, photo_id, this.authService.headers)
			.subscribe(result => { 
				console.log("apagado");
				this.model = new Photo(photo_id, null, null, null, step_id, null); //reseting step form
				this.updatePhotosList({
			      photo: this.model,
			      action: 'delete'
			    });
			}
		);
	}

	updateDataReceivedFromParent() {
		this.project_id = this.projectId; //getting data from parent component 
		this.step_id = this.stepId; //getting data from parent component 
		this.options['url'] = "http://localhost:8000/upload/projects/"+ this.projectId + "/step/" + this.stepId + "/"; //url that will be used to upload the photos
	}

	afterFileUpload(stepId: string, projectId: string, responseData:any): void { //called by input file field, after a file is complete uploaded to the server 

		if (responseData && responseData.response) {
			responseData = JSON.parse(responseData.response);
			this.uploadedFiles.push(responseData);
			this.model = responseData;
			this.model.file = responseData.file.substring(responseData.file.indexOf('static'),responseData.file.length); //todo: understand why the path of image is complete, including localhost
			this.updatePhotosList({photo: this.model});
		}

		this.clearFilesFromInputField();
		
	}

	clearFilesFromInputField() { //the files array from input field need to cleaned to be ready for the other steps photos upload
		(<HTMLInputElement>document.getElementById('inputFile')).form.reset();
		(<HTMLInputElement>document.getElementById('inputFile')).value = "" ;
	}

	updatePosition($event:any) { //called after a photo has its place changed by the user (drag n drop)
		for (let i=0; i<this.photos.length; i++){
			this.photos[i].position=i;
			let original_file = this.photos[i].file;
			this.photoService.savePhoto(this.projectId, this.stepId, this.photos[i], this.authService.headers) //the photo need to be updated
				.subscribe(result => { 
					this.photos[i]=result;
					this.photos[i].file = original_file;
				}
			);
		}
	}

	setMainPhoto(photo:Photo, index:number) {
		let original_file = photo.file;
		this.photoService.setMainPhotoOfProject(this.projectId, photo, this.authService.headers)
			.subscribe(result => { 
				this.photos[index]=result;
				this.photos[index].file = original_file;
			}
		);
	}

	updatePhotosList(event:any) {
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

    	if (event.action=="delete") 
    		this.photos.splice(position, 1);    		
    	else if (updating) 
    		this.photos[position] = event.photo;    			
    	else 
    		this.photos.push(event.photo);
	}

}