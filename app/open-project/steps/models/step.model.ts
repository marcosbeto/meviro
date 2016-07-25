import { OpenProject } from '../../models/open-project.model';

export class Step {
	constructor (
		public id: number,
		public position?: number,
		public title?: string,
		public project?: OpenProject,
	) { }
}


