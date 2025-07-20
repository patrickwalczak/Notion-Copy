import { BlockBaseType } from './block';

// Operations in the top three dots
// changeFontFamily, copyLink, duplicate, move, delete, changeFontSize (isSmallText), changeWidth (isFullWidth), lockPage (isPageLocked), undo, import, export

export type PageElementOperationsUnionType =
	| 'turnInto'
	| 'color'
	| 'editIcon'
	| 'addToFavorites'
	| 'rename'
	| 'openInNewTab'
	| 'openInSidePeek'
	| 'copyLink'
	| 'duplicate'
	| 'move'
	| 'delete';

// Operations in the page editor popup
// turnInto, color, editIcon, addToFavorites, rename, openInNewTab, openInSidePeek, copyLink, duplicate, move, delete

export type PageElementOperationsType = Record<'name', PageElementOperationsUnionType>;

export interface PageElementProperties {
	name: string;
	icon: string;
	cover: string;
	isSmallText: boolean;
	isFullWidth: boolean;
	isPageLocked: boolean;
	textColor: string;
	backgroundColor: string;
}

export type PageTypesType = 'page';

interface PageBaseType {
	id: string;
	userId: string;
	createdAt: Date;
	modifiedAt: Date;
	parentId: string | null;
	type: PageTypesType;
	order: number;
	properties: PageElementProperties;
	isFocusable: boolean;
}

export interface PageFullEntityType extends PageBaseType {
	subpages: PageFullEntityType[];
	blocks: BlockBaseType[];
}

export interface PageEntityType extends PageBaseType {
	subpages: PageEntityType[];
}

export interface PageForContextType extends PageBaseType {
	elements: (BlockBaseType | PageEntityType)[];
}
