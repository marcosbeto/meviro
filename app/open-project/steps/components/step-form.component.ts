declare var tinymce:any;

import { Component, EventEmitter, Input, OnInit, Output, DoCheck, ViewChild, NgZone} from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';
import { PhotoService } from '../photos/services/photo.service';
import { PhotoComponent } from '../photos/components/photo.component';

@Component({
	exportAs: 'stepForm',
	selector: 'new-step',
	templateUrl: 'app/open-project/steps/templates/step-form.component.html',
	directives: [
		MODAL_DIRECTIVES,
		PhotoComponent
	],
	viewProviders:[BS_VIEW_PROVIDERS],
	providers: [PhotoService]
})

export class StepFormComponent implements OnInit {

	@Input() stepsArray: Step[];
	@Output() stepsListChange = new EventEmitter();
	@Input() projectId: number;
	@ViewChild('addNewStepModal') addNewStepModal: any; //<== reference to Modal directive
	@ViewChild('addPhotosModal') addPhotosModal:any;
  	
	public step_id: number;
	public project_id: string;
	action: string = 'addNew';
	model: Step;
	showGreeting:boolean=true;


	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService, 
		private _routeParams:ActivatedRoute,
		private zone: NgZone
		) {

		this.model = new Step(null, null, null, null, null);

	}

	ngOnInit() {	
		if (this.projectId)
			this.model = new Step(null, null, null, null, this.projectId);
		
		tinymce.init({
        	selector: "#mytextarea",
        	min_height: 250,
        	menubar: false,
        	theme: 'modern',
        	plugins: 'link',
            statusbar: false,
         	toolbar: 'formatselect | bullist numlist | alignleft aligncenter alignfull | bold italic underline | link',
  			fontsize_formats: '12pt 14pt 16pt',
  			block_formats: 'Texto normal=p;Destaque=h1;',
  			content_style: "p {font-size:11pt;font-family:Arial,Helvetica, sans-serif;} h1 {font-size:14pt;font-family:'Roboto',Helvetica,Aria,sans-serif;}",
  			formats: {
			    alignleft: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
			    aligncenter: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
			    alignright: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
			    alignfull: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
			    bold: {inline : 'span', 'classes' : 'bold'},
			    italic: {inline : 'span', 'classes' : 'italic'},
			    underline: {inline : 'span', 'classes' : 'underline', exact : true},
			    strikethrough: {inline : 'del'},
			    forecolor: {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
			    hilitecolor: {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
			    custom_format: {block : 'h1', attributes : {title : 'Header'}, styles : {color : 'red'}}
			  }
      	});
	}



	saveStep(project_id:number) {

		let updating = false;
		
		if (this.model.id)
			updating = true;

		this.model.position = this.stepsArray.length; 
		this.model.content = tinymce.activeEditor.getContent();

		this.stepService.saveStep(project_id, this.model, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.stepsListChange.emit({
			      step: this.model,
			      action: 'saveUpdate'
			    });
			    this.addNewStepModal.hide();
			    if (!updating)
					this.model = new Step(null, null, null, null, project_id); //reseting step form
			}
		);
	}

	openModal(action:string, project_id:number, step_id: number, openModal:boolean, model:any) {
		
		this.action = action;
		this.step_id = step_id;

		if (action=='updateStep') {
			this.getStepDetail(project_id, step_id, openModal);
		} else if (action=="newStep") {
			this.model = new Step(null, null, null, null, project_id);
			tinymce.activeEditor.setContent("");
			this.addNewStepModal.show(); 
		} else if (action=="addPhoto") {
			this.addPhotosModal.show();
		}
	}

	getStepDetail(project_id:number, step_id: number, openModal:boolean) { 
		this.stepService.getStepDetail(project_id, step_id, this.authService.headers)
			.subscribe(result => { 
				this.model = result;
				this.step_id = this.model.id;
				if (openModal) {
					tinymce.activeEditor.setContent(this.model.content);
					this.addNewStepModal.show(); 
				}

			}
		);
	}

	deleteStep(project_id:number, step_id: number) {

		this.stepService.deleteStep(project_id, step_id, this.authService.headers)
			.subscribe(result => { 
				this.model = new Step(step_id, null, null, null, project_id); //reseting step form
				this.stepsListChange.emit({
			      step: this.model,
			      action: 'delete'
			    });
			}
		);
	}

}