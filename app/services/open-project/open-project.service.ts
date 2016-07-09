import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { OpenProject } from '../../models/open-project.model';

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
								new OpenProject(project.fields.id, project.fields.title, null, null, null, null, null, null, null)
							);
						});
					}
					return result;
				});
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}