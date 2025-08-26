import { PageEntityType } from '@/types/page';

export function buildPageTree(pages: PageEntityType[]): PageEntityType[] {
	const pageMap = new Map<string, PageEntityType>();
	const rootPages: PageEntityType[] = [];

	for (const page of pages) {
		page.subpages = [];
		pageMap.set(page.id, page);
	}

	for (const page of pages) {
		if (page.parentId) {
			const parent = pageMap.get(page.parentId);
			if (parent) {
				parent.subpages.push(page);
			}
		} else {
			rootPages.push(page);
		}
	}

	return rootPages;
}
