export class Photo {
	constructor (
		public id: number,
		public created?: string,
		public file?: string,
		public position?: number,
		public step?: number,
		public isProjectPhoto?: boolean
	) { }
}

