export interface Page {
	id: number;
	title: string;
	icon: string;
	cover: string;
	type: string;
	children: Page[];
	parentId: number | null;
}
