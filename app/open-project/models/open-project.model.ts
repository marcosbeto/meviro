export class OpenProject {
	constructor (
		public id: number,
		public title: string,
		public author?: string,
		public date?: string,
		public last_update_date?: string,
		public category?: string,
		public difficulty?: string,
		public tags?: string,
		public abstract?: string,
		public metauser_id?: number,
		public main_photo?: string
	) { }
}
// export class OpenProject {
//     id: number;
// 	title: string;
// 	tags: string[];
// 	date_added: string;
// 	steps: string[];
// 	user_id: number;
// 	category: string;
// 	difficulty: string;
// 	materials: string[];
//     constructor(id: number,
// 		title: string,
// 		tags: string[],
// 		date_added: string,
// 		steps: string[],
// 		user_id: number,
// 		category: string,
// 		difficulty: string,
// 		materials: string[]) {
// 		this.id: id;
// 		this.title: title;
// 		this.tags: tags;
// 		this.date_added: date_added;
// 		this.steps: steps;
// 		this.user_id: user_id;
// 		this.category: category;
// 		this.difficulty: difficulty;
// 		this.materials: materials;
//     }
    
// }