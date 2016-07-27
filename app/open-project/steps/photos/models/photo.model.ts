export class Photo {
	constructor (
		public id: number,
		public original_url?: string,
		public medium_url?: string,
		public thumbnail_url?: string,
		public original_width?: number,
		public original_height?: number,
		public step?: number
	) { }
}

