import { PAGE_OPERATIONS } from '@/app/editor/[pageId]/utils/operations';
import { PagePropertiesSchema } from '@/schemas/page';
import z from 'zod';

// Operations in the top three dots
// changeFontFamily, copyLink, duplicate, move, delete, changeFontSize (isSmallText), changeWidth (isFullWidth), lockPage (isPageLocked), undo, import, export

// Operations in the page editor popup
export type PageOperationsType = (typeof PAGE_OPERATIONS)[number];

export type PagePropertiesType = z.infer<typeof PagePropertiesSchema>;

export type PageTypesType = 'page';

export interface PageModelType {
	id: string;
	createdAt: Date;
	modifiedAt: Date;
	parentId: string | null;
	order: number;
	type: PageTypesType;
	properties: PagePropertiesType;
	isFocusable: boolean;
}

// Generic helper to add a recursive children field
type WithChildren<T, K extends string = 'subpages'> = T & { [P in K]: WithChildren<T, K>[] };

export type PageTreeType = WithChildren<PageModelType>;
