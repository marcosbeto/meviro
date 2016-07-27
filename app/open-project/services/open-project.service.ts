import { Injectable, NgZone }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { OpenProject } from '../models/open-project.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class OpenProjectService {

	baseUrl: string;
	listProjectsUrl: string;
	updateProjectUrl: string;
	deleteProjectUrl: string;

	constructor(private http: Http, private authService: AuthService) {
		this.setApiUrls();
	}

	setApiUrls() {
		this.baseUrl = "http://localhost:8000/dashboard/" + localStorage.getItem('profile.api_user_id') + "/";
		this.listProjectsUrl = this.baseUrl + "projects/";
		this.updateProjectUrl = this.listProjectsUrl + "update/";
		this.deleteProjectUrl = this.listProjectsUrl + "delete/";
	}

	getProjects(header: Headers){

		return this.http.get(this.listProjectsUrl, {
					headers: header
				})
				.map((responseData) => {
					let projects = JSON.parse(responseData.json());				
					let allProjects: Array<OpenProject> = [];					
					
					if (projects) {						
						projects.forEach((project:any) => {						
							allProjects.push(
								new OpenProject(project.pk, project.fields.title, null, null, null, null)
							);
						});
					}
					return allProjects;

				});
	}

	getProjectDetail(projectID: number, header: Headers) {

		return this.http.get(this.listProjectsUrl + projectID + "/", {
					headers: header
				})
				.map((responseData) => {
					let project = JSON.parse(responseData.json());				
					return new OpenProject(project[0].pk, project[0].fields.title, null, null, null, project[0].fields.metauser_id);
				});
	}

	saveProject(projectToSave:OpenProject, header: Headers) {

	    let body = JSON.stringify(projectToSave);

	    header.append('Content-Type', 'application/json');

	    if (projectToSave.id!=null) { //update

	    	return this.http.put(this.updateProjectUrl + projectToSave.id + "/",
	    		body, {
					headers: header
				})
				.map((responseData) => {
					let project = responseData.json();
					header.delete('Content-Type');
					return new OpenProject(project.id, project.title, null, null, null, null);
				});


	    }

		return this.http.post(this.listProjectsUrl + "add/", body, {
			headers: header
		})
		.map((responseData) => {
			let project = responseData.json();
			header.delete('Content-Type');
			return new OpenProject(project.id, project.title, null, null, null, null);
		});
	}

	deleteProject(projectID: number, header: Headers) {
		return this.http.delete(this.listProjectsUrl + projectID + "/", {
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