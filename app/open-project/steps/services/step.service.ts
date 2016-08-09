import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { Step } from '../models/step.model';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable()
export class StepService {

	baseUrl: string;
	listProjectsUrl: string;
	saveStepUrl: string;
	
	constructor(private http: Http, private authService:AuthService) {
		this.setApiUrls();		
	}

	setApiUrls() {
		this.baseUrl = "http://localhost:8000/dashboard/" + localStorage.getItem('profile.api_user_id') + "/";
		this.listProjectsUrl = this.baseUrl + "projects/";
	}

	getSteps(projectID:number, header: Headers){
			
		return this.http.get(this.listProjectsUrl + projectID + "/steps/", {
					headers: header
				})
				.map((responseData) => {
					let steps = JSON.parse(responseData.json());
					let result: Array<Step> = [];
					if (steps) {			
						steps.forEach((step:any) => {						
							result.push(
								new Step(step.pk, step.fields.position, step.fields.title, step.fields.content, step.fields.project)
							);
						});
					}
					return result;
				});
	}

	saveStep(projectID:number, stepToSave:Step, header: Headers) {

	    let body = JSON.stringify(stepToSave);

	    header.append('Content-Type', 'application/json');

	    if (stepToSave.id!=null) { //update
	    	return this.http.put(this.baseUrl + "steps/update/" + stepToSave.id + "/" ,
	    		body, {
					headers: header
				})
				.map((responseData) => {
					let step = responseData.json();
					header.delete('Content-Type');
					return new Step(step.id, step.position, step.title, step.content, step.project);
				});


	    }

		return this.http.post(this.listProjectsUrl + stepToSave.project + "/steps/add/", 
			body, {
				headers: header
			})
			.map((responseData) => {
				let step = responseData.json();
				header.delete('Content-Type');
				return new Step(step.id, null, step.title, step.content, step.project);
			});
	}

	getStepDetail(projectID: number, stepID:number, header: Headers) {
		return this.http.get(this.baseUrl + "steps/" + stepID + "/", {
					headers: header
				})
				.map((responseData) => {
					let step = JSON.parse(responseData.json());
					return new Step(step[0].pk, null, step[0].fields.title, step[0].fields.content, step[0].fields.project);
				});
	}

	deleteStep(projectID: number, stepID:number, header: Headers) {
		return this.http.delete(this.baseUrl + "steps/delete/" + stepID + "/" , {
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