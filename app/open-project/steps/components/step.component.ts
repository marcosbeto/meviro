import { Component, EventEmitter, Input, OnInit, Output, DoCheck, ViewChild, NgZone, 
	AfterContentInit, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

import { AuthService } from '../../../auth/services/auth.service';
import { Step } from '../models/step.model';
import { OpenProject } from '../../models/open-project.model';
import { StepService } from '../services/step.service';
import { PhotoService } from '../photos/services/photo.service';
import { StepFormComponent } from '../components/step-form.component';

@Component({
	selector: 'list-steps',
	templateUrl: 'app/open-project/steps/templates/step.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		Dragula,
		StepFormComponent
	],
	providers: [AuthService],
	viewProviders: [DragulaService]
})

export class StepComponent implements OnInit, AfterContentInit{

	public steps: Step[]; //will be imported by its child StepFormComponent
	public project_id: number; //will be imported by its child StepFormComponent
	@Input() projectId: number; //recieved by its parent OpenProjectForm
	public i:number;
	public stepses:any;

	@ContentChildren('stepsitem') items: QueryList<ElementRef>;
	
	constructor(
		private stepService: StepService,
		private router: Router,
		private authService: AuthService,
		private _routeParams:ActivatedRoute, zone: NgZone,
		private dragulaService: DragulaService) {

		// dragulaService.setOptions('first-bag', {
	 	//      removeOnSpill: false
	 	//    });

		dragulaService.drop.subscribe((value:any) => {
	      console.log(`drop: ${value[0]}`);
	      console.log(value);
	      this.onDrop(value.slice(1));
	    });

	    dragulaService.over.subscribe((value:any) => {
	      console.log(`over: ${value[0]}`);
	      this.onOver(value.slice(1));
	    });

	}

	ngAfterContentInit() {
     // do something with list items
     console.log(this.items);
  	}

	private onDrop(args:any) {
	    let [e, el] = args;
	    // do something
	    console.log("drop");
	    console.log(e.id);
	}

	private onOver(args:any) {
    	let [e, el, container] = args;
    	console.log("over");
    	console.log(e.id);
  	}


	ngOnInit() {	
		this.project_id = this.projectId;
		if (this.project_id) {
			this.getSteps(this.project_id);
		}
	}

	getSteps(open_project_id: number) { 
		this.stepService.getSteps(open_project_id, this.authService.headers)
			.subscribe(result => { 
				this.steps = result;
			}
		);
	}

	addStepToArray_Listener(event:any) {
    	
    	let counter = 0;
    	let position = 0;
    	let updating = false;
    	this.steps.filter(step => {
    			if (step.id == event.step.id) {
    				updating = true;
    				position = counter;
    			} 
    			counter++;
    			return true;
    		})[0];

    	if (event.action=="delete") { 
    		this.steps.splice(position, 1);    		
    	} else {
    		if (updating) {
    			this.steps[position] = event.step;    			
    		} else {
    			this.steps.push(event.step);
    		}
    	}
  	}

	
}