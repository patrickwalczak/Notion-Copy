import { PageEntityType } from '@/types/page';

export function removePageAndReturnDeleted(
	pages: PageEntityType[],
	pageId: string
): { updatedPages: PageEntityType[]; removedPage: PageEntityType | null } {
	let removed: PageEntityType | null = null;

	const filtered = pages
		.map((page) => {
			if (page.id === pageId) {
				removed = page;
				return null;
			}

			if (page.subpages.length > 0) {
				const result = removePageAndReturnDeleted(page.subpages, pageId);
				if (result.removedPage) {
					removed = result.removedPage;
					return {
						...page,
						subpages: result.updatedPages,
					};
				}
			}

			return page;
		})
		.filter(Boolean) as PageEntityType[];

	return { updatedPages: filtered, removedPage: removed };
}

export const addPageRecursively = (
	pages: PageEntityType[],
	parentId: string,
	newSubpage: PageEntityType
): PageEntityType[] => {
	return pages.map((page) => {
		if (page.id === parentId) {
			return {
				...page,
				subpages: [...page.subpages, newSubpage],
			};
		}

		if (page.subpages.length > 0) {
			return {
				...page,
				subpages: addPageRecursively(page.subpages, parentId, newSubpage),
			};
		}

		return page;
	});
};

export function updatePageNameRecursively(pages: PageEntityType[], id: string, newName: string): PageEntityType[] {
	return pages.map((page) => {
		if (page.id === id) {
			return {
				...page,
				properties: {
					...page.properties,
					name: newName,
				},
			};
		}

		if (page.subpages && page.subpages.length > 0) {
			return {
				...page,
				subpages: updatePageNameRecursively(page.subpages, id, newName),
			};
		}

		return page;
	});
}
