import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { Photo } from '../models/photo.model';
import { AuthService } from '../../../../auth/services/auth.service';

@Injectable()
export class PhotoService {

	baseUrl: string;
	listPhotosUrl: string;
	saveStepUrl: string;
	uploadPhotoUrl: string;
	updateMainPhotoUrl: string;
	
	constructor(private http: Http, private authService:AuthService) {
		this.setApiUrls();		
	}

	setApiUrls() {
		this.baseUrl = "http://localhost:8000/dashboard/" + this.authService.metauser_id + "/";
		this.listPhotosUrl = this.baseUrl + "steps/";
		this.uploadPhotoUrl = "http://localhost:8000/upload/projects/";
		this.updateMainPhotoUrl = "http://localhost:8000/projects/" ;
	}

	getPhotos(stepId:number, isPublic:boolean, header: Headers){
		
		if (isPublic)
			this.listPhotosUrl = this.updateMainPhotoUrl + "step/" +  stepId +  "/";
		else
			this.listPhotosUrl = this.baseUrl + "steps/" + stepId + "/photos/";
			
		return this.http.get(this.listPhotosUrl, {
					headers: header
				})
				.map((responseData) => {
					let photos = JSON.parse(responseData.json());
					let result: Array<Photo> = [];
					if (photos) {			

						photos.forEach((photo:any) => {						
							result.push(
								new Photo(
									photo.pk,
									photo.fields.created,
									photo.fields.file,
									photo.fields.position,
									photo.fields.step,
									photo.fields.isProjectPhoto
								)
							);
						});
					}
					return result;
				});
	}

	savePhoto(projectId:number, stepId:number, photoToSave:Photo, header: Headers) {

		delete photoToSave.file; //the file won't be updated, so we need to remove it from the body of the request
	    let body = JSON.stringify(photoToSave);
		
		if (header.get('Content-Type')!='application/json')
	    	header.append('Content-Type', 'application/json');

    	return this.http.put(this.uploadPhotoUrl + projectId + "/step/" + stepId + "/update/" + photoToSave.id + "/" ,
    		body, {
				headers: header
			})
			.map((responseData) => {

				let photo = responseData.json();
				header.delete('Content-Type');
				return new Photo(
						photo.id, 
						photo.created,
						photo.file,
						photo.position,
						photo.step,
						photo.isProjectPhoto
					);
			});

	}

	// getMainPhoto(projectId:number, header: Headers) {

	// 	return this.http.get(this.updateMainPhotoUrl + projectId + "/get_main_photo/" ,
 //    		{
	// 			headers: header
	// 		})
	// 		.map((responseData) => {
	// 			let photo = JSON.parse(responseData.json());	
	// 			header.delete('Content-Type');
	// 			console.log("eita");
	// 			return new Photo(
	// 					photo[0].pk, 
	// 					photo[0].fields.created,
	// 					photo[0].fields.file,
	// 					photo[0].fields.position,
	// 					photo[0].fields.step,
	// 					photo[0].fields.isProjectPhoto
	// 				);
	// 		});


	// }

	setMainPhotoOfProject(projectId:number, photoToSave:Photo, header: Headers) {

		// delete photoToSave.file; //the file won't be updated, so we need to remove it from the body of the request
		photoToSave.isProjectPhoto = true;
	    let body = JSON.stringify(photoToSave);

	    if (header.get('Content-Type')!='application/json')
	    	header.append('Content-Type', 'application/json');

	    return this.http.put(this.updateMainPhotoUrl + projectId + "/photo_id/" + photoToSave.id + "/" ,
    		body, {
				headers: header
			})
			.map((responseData) => {
				let photo = responseData.json();
				header.delete('Content-Type');

				return new Photo(
						photo.id, 
						photo.created,
						photo.file,
						photo.position,
						photo.step,
						photo.isProjectPhoto
					);
			});

	}

	getPhotoDetail(step_id: number, photo_id: number, header: Headers) {

		return this.http.get(this.listPhotosUrl + step_id + "/steps/" + photo_id + "/", {
					headers: header
				})
				.map((responseData) => {
					let photo = JSON.parse(responseData.json());
					return new Photo(
							photo[0].id, 
							photo[0].fields.created,
							photo[0].fields.file,
							photo[0].fields.position,
							photo[0].fields.step,
							photo[0].fields.isProjectPhoto
						);
				});
	}

	deletePhoto(step_id: number, photo_id: number, header: Headers) {
		return this.http.delete(this.baseUrl + "photos/delete/" + photo_id + "/" , {
				headers: header
			})
			.map((responseData) => {
				return responseData;
			});
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}
