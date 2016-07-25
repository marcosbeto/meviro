import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { OpenProject } from '../models/open-project.model';

@Injectable()
export class OpenProjectService {

	private listProjectsUrl = 'http://localhost:8000/projects/';  // URL to web api
	private updateProjectUrl = 'http://localhost:8000/projects/update/';  // URL to web api
	private deleteProjectUrl = 'http://localhost:8000/projects/delete/';  // URL to web api

	constructor(private http: Http) {}

	getProjects(header: Headers){
			
		return this.http.get(this.listProjectsUrl, {
					headers: header
				})
				.map((responseData) => {
					return JSON.parse(responseData.json());
				})
				.map((projects: Array<any>) => {
					let result: Array<OpenProject> = [];
					if (projects) {						
						projects.forEach((project) => {						
							result.push(
								new OpenProject(project.pk, project.fields.title, null, null, null, null, null, null, null)
							);
						});
					}
					return result;
				});
	}

	getProjectDetail(projectID: number, header: Headers) {

		return this.http.get(this.listProjectsUrl + projectID + "/", {
					headers: header
				})
				.map((responseData) => {
					return JSON.parse(responseData.json());
				})
				.map((project: <OpenProject>) => {
					return new OpenProject(project[0].pk, project[0].fields.title, null, null, null, null, null, null, null);
				});
	}

	saveProject(projectToSave:OpenProject, header: Headers) {

	    let body = JSON.stringify(projectToSave);

		console.log("---->");
	    console.log(body);

	    header.append('Content-Type', 'application/json');

	    if (projectToSave.id!=null) { //update

	    	return this.http.put(this.updateProjectUrl + projectToSave.id + "/",
	    		body, {
					headers: header
				})
				.map((responseData) => {
					console.log('responseData');
					console.log(responseData);
					return responseData.json();
				})
				.map((project: <OpenProject>) => {
					console.log('project');
					console.log(project);
					return new OpenProject(project.id, project.title, null, null, null, null, null, null, null);
				});


	    }

	    console.log("bocyzera");
	    console.log(body);

		return this.http.post(this.listProjectsUrl + "add/", body, {
			headers: header
		})
		.map((responseData) => {
			return responseData.json();
		})
		.map((project: <OpenProject>) => {
			return new OpenProject(project.id, project.title, null, null, null, null, null, null, null);
		});
	}

	deleteProject(projectID: number, header: Headers) {
		return this.http.delete(this.listProjectsUrl + projectID + "/", {
				headers: header
			})
			.map((responseData) => {
				console.log(responseData);
				return responseData;
			});
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}