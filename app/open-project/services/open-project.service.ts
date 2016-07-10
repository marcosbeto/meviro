import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { OpenProject } from '../models/open-project.model';

@Injectable()
export class OpenProjectService {

	private listProjectsUrl = 'http://localhost:8000/projects/';  // URL to web api

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
					// console.log(responseData.json());
					return JSON.parse(responseData.json());
				})
				.map((project: <OpenProject>) => {
					// resp = JSON.parse(project.json());
					// console.log(project);
					// console.log('project.title');
					// console.log(resp);
					// console.log(project[0].fields);
					// projectObj = new OpenProject(project[0].pk, project[0].fields.title, null, null, null, null, null, null, null)
					return new OpenProject(project[0].pk, project[0].fields.title, null, null, null, null, null, null, null);
				});
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}