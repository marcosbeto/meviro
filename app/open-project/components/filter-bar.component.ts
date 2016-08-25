import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }    from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import { AuthService } from '../../auth/services/auth.service';
import { OpenProjectService } from '../services/open-project.service'; 

import { AppSettings } from '../../app.settings'

@Component({
	exportAs: 'filterBar',
    selector: 'filter-bar-outlet',
    directives: [
    	ROUTER_DIRECTIVES,
    	DROPDOWN_DIRECTIVES
    ],
    templateUrl: 'app/open-project/templates/filter-bar.component.html',
})

export class FilterBarComponent implements OnInit {

	categories = AppSettings.ALL_CATEGORIES;
	selectedCategory: {} = {'id':0, 'name':'Qual o seu tipo de deficiência?'};

	@Output() onSelectCategory = new EventEmitter<any>();

	ngOnInit() {

		console.log("initlizing");

		if (!this.selectedCategory)
			this.selectedCategory = {'id':0, 'name':'Qual o seu tipo de deficiência?'};

	}

	dropdownSetup(category:any) {
		this.selectedCategory = category;
		this.onSelectCategory.emit(this.selectedCategory);
	}

}
