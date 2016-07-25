import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { Step } from '../models/step.model';

@Injectable()
export class StepService {

	private listProjectsUrl = 'http://localhost:8000/projects/';  // URL to web api
	private saveStepUrl = 'http://localhost:8000/steps/';  // URL to web api
	
	constructor(private http: Http) {}

	getSteps(projectID:number, header: Headers){
			
		return this.http.get(this.listProjectsUrl + projectID + "/steps/", {
					headers: header
				})
				.map((responseData) => {
					return JSON.parse(responseData.json());
				})
				.map((steps: Array<any>) => {
					let result: Array<Step> = [];
					if (steps) {			
						steps.forEach((step) => {						
							console.log(step);
							result.push(
								new Step(step.pk, step.fields.position, step.fields.title, step.fields.project)
							);
						});
					}
					return result;
				});
	}

	saveStep(stepToSave:Step, header: Headers) {

	    let body = JSON.stringify(stepToSave);

	    header.append('Content-Type', 'application/json');

	    if (stepToSave.id!=null) { //update

	    	return this.http.put(this.saveStepUrl + stepToSave.id + "/",
	    		body, {
					headers: header
				})
				.map((responseData) => {
					console.log('responseData');
					console.log(responseData);
					return responseData.json();
				})
				.map((step: <Step>) => {
					console.log('step');
					console.log(step);
					// return new Step(step.pk, null, step.title, null)
				});


	    }

		return this.http.post(this.saveStepUrl + "add/", body, {
			headers: header
		})
		.map((responseData) => {
			return responseData.json();
		})
		.map((step: <Step>) => {
			console.log("stepeta");
			console.log(step);
			// return new Step(step.id, null, step.title, null);
		});
	}



	// getStepDetail(projectID: number, header: Headers) {

	// 	return this.http.get(this.listProjectsUrl + projectID + "/", {
	// 				headers: header
	// 			})
	// 			.map((responseData) => {
	// 				return JSON.parse(responseData.json());
	// 			})
	// 			.map((project: <OpenProject>) => {
	// 				return new OpenProject(project[0].pk, project[0].fields.title, null, null, null, null, null, null, null);
	// 			});
	// }

	

	// deleteProject(projectID: number, header: Headers) {
	// 	return this.http.delete(this.listProjectsUrl + projectID + "/", {
	// 			headers: header
	// 		})
	// 		.map((responseData) => {
	// 			console.log(responseData);
	// 			return responseData;
	// 		});
	// }

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}