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
	
	constructor(private http: Http, private authService:AuthService) {
		this.setApiUrls();		
	}

	setApiUrls() {
		this.baseUrl = "http://localhost:8000/dashboard/" + this.authService.metauser_id + "/";
		this.listPhotosUrl = this.baseUrl + "steps/";
	}

	getPhotos(stepId:number, header: Headers){
		
		return this.http.get(this.listPhotosUrl + stepId + "/photos/", {
					headers: header
				})
				.map((responseData) => {
					let photos = JSON.parse(responseData.json());
					let result: Array<Photo> = [];
					if (photos) {			
						photos.forEach((photo:any) => {						
							result.push(
								new Photo(photo.pk, photo.fields.original_url, null, null, null, null, photo.fields.step)
							);
						});
					}
					return result;
				});
	}

	savePhoto(photoId: number, photoToSave:Photo, header: Headers) {

	    let body = JSON.stringify(photoToSave);

	    header.append('Content-Type', 'application/json');

	    if (photoToSave.id!=null) { //update
	    	return this.http.put(this.listPhotosUrl + photoId + "/steps/update/" + photoToSave.id + "/" ,
	    		body, {
					headers: header
				})
				.map((responseData) => {
					let photo = responseData.json();
					header.delete('Content-Type');
					return new Photo(photo.pk, photo.original_url, null, null, null, null, photo.step);
				});


	    }

		return this.http.post(this.listPhotosUrl + photoToSave.step + "/photos/add/", 
			body, {
				headers: header
			})
			.map((responseData) => {
				let photo = responseData.json();
				header.delete('Content-Type');
				return new Photo(photo.id, photo.original_url, null, null, null, null, photo.step);
			});
	}

	getPhotoDetail(step_id: number, photo_id: number, header: Headers) {

		return this.http.get(this.listPhotosUrl + step_id + "/steps/" + photo_id + "/", {
					headers: header
				})
				.map((responseData) => {
					let photo = JSON.parse(responseData.json());
					return new Photo(photo[0].pk, photo[0].fields.original_url, null, null, null, null, photo[0].fields.step);
				});
	}

	deletePhoto(step_id: number, photo_id: number, header: Headers) {
		return this.http.delete(this.listPhotosUrl + step_id + "/photos/delete/" + photo_id + "/" , {
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