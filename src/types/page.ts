import { BlockBaseType } from './block';

export type PageElementOperationsUnionType =
	| 'copyLink'
	| 'duplicate'
	| 'delete'
	| 'rename'
	| 'move'
	| 'addToFavorites'
	| 'undo'
	| 'export'
	| 'import'
	| 'lockPage';

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
