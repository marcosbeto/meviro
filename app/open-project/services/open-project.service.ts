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
	detailProjectUrl: string;
	countProjects:number;


	publicAction: boolean = false;

	constructor(private http: Http, private authService: AuthService) {

		this.setApiUrls(localStorage.getItem('profile.api_user_id'), false);

	}

	setApiUrls(api_user_id:string, isPublic:boolean) {
		
		if (api_user_id && !isPublic)
			this.baseUrl = "http://localhost:8000/dashboard/" + api_user_id + "/";
		else
			this.baseUrl = "http://localhost:8000/";

		this.listProjectsUrl = this.baseUrl + "projects/";
		this.updateProjectUrl = this.listProjectsUrl + "update/";
		this.deleteProjectUrl = this.listProjectsUrl + "delete/";
		this.detailProjectUrl = "http://localhost:8000/public-project/";

	}

	getProjects(header: Headers, page:number, category:number){

		let pageUrl = "";
		let categoryUrl = "";

		if (page)
			pageUrl="?page="+page;

		if (category)
			categoryUrl="&category="+category;

		return this.http.get(this.listProjectsUrl + pageUrl + categoryUrl, {
					headers: header
				})
				.map((responseData) => {
					let projects = responseData.json().results;				
					this.countProjects = responseData.json().count;
					let allProjects: Array<OpenProject> = [];					
					
					if (projects) {						
						projects.forEach((project:any) => {	
							allProjects.push(
								new OpenProject(
									project.id, 
									project.title, 
									project.author, 
									project.date, 
									project.last_update_date, 
									project.category, 
									project.difficulty, 
									project.tags, 
									project.abstract,
									project.metauser_id,
									project.main_photo
								)
							);
						});
					}
					return allProjects;

				});
	}

	getProjectDetail(projectID: number, isPublic:boolean, header: Headers) {

		let url:string;

		if (isPublic) 
			url = this.detailProjectUrl;
		else
			url = this.listProjectsUrl;


		return this.http.get(url + projectID + "/", {
					headers: header
				})
				.map((responseData) => {
					let project = JSON.parse(responseData.json());	
					return new OpenProject(
						project[0].pk, 
						project[0].fields.title, 
						project[0].fields.author, 
						project[0].fields.date, 
						project[0].fields.last_update_date, 
						project[0].fields.category, 
						project[0].fields.difficulty, 
						project[0].fields.tags, 
						project[0].fields.abstract,
						project[0].fields.metauser_id,
						project[0].fields.main_photo
					);
				});
	}

	saveProject(projectToSave:OpenProject, header: Headers) {

	    let body = JSON.stringify(projectToSave);

	    if (header.get('Content-Type')!='application/json')
			header.append('Content-Type', 'application/json');

	    if (projectToSave.id!=null) { //update
	    	return this.http.put(this.updateProjectUrl + projectToSave.id + "/",
	    		body, {
					headers: header
				})
				.map((responseData) => {
					let project = responseData.json();
					header.delete('Content-Type');
					return new OpenProject(
									project.id, 
									project.title, 
									project.author, 
									project.date, 
									project.last_update_date, 
									project.category, 
									project.difficulty, 
									project.tags, 
									project.abstract,
									project.metauser_id,
									project.main_photo
								)
				});


	    }

		return this.http.post(this.listProjectsUrl + "add/", body, {
			headers: header
		})
		.map((responseData) => {
			let project = responseData.json();
			header.delete('Content-Type');
			return new OpenProject(
							project.id, 
							project.title, 
							project.author, 
							project.date, 
							project.last_update_date, 
							project.category, 
							project.difficulty, 
							project.tags,
							project.abstract, 
							project.metauser_id,
							project.main_photo

						);
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