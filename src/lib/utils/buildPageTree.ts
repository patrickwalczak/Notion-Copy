import { PageModelType, PageTreeType } from '@/types/page';

function toEntity(p: PageModelType): PageTreeType {
	return {
		id: p.id,
		createdAt: p.createdAt,
		modifiedAt: p.modifiedAt,
		parentId: p.parentId,
		type: p.type,
		order: p.order,
		properties: p.properties,
		isFocusable: p.isFocusable,
		subpages: [],
	};
}

export function buildPageTree(pages: PageModelType[]): PageTreeType[] {
	const map = new Map<string, PageTreeType>();
	const roots: PageTreeType[] = [];

	for (const page of pages) {
		map.set(page.id, toEntity(page));
	}

	for (const page of pages) {
		const node = map.get(page.id)!;
		if (page.parentId) {
			const parent = map.get(page.parentId);
			if (parent) {
				parent.subpages.push(node);
			} else {
				roots.push(node);
			}
		} else {
			roots.push(node);
		}
	}

	return roots;
}
