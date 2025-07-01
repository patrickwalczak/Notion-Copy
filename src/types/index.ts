export type ElementTypesType = 'page' | 'table' | 'tableParent' | 'text' | 'h1' | 'h2' | 'h3';

export type TextElementsType = 'text' | 'h1' | 'h2' | 'h3';

type OperationsType =
	| { name: 'duplicate'; options?: { 0: { name: 'withContent' }; 1: { name: 'withoutContent' } } }
	| { name: 'copyParentLink' }
	| { name: 'color' }
	| { name: 'delete' }
	| { name: 'turnInto' }
	| { name: 'rename' }
	| { name: 'move' }
	| { name: 'addToFavorites' }
	| { name: 'copyLink' }
	| { name: 'turnIntoInlineDatabase' }
	| { name: 'editIcon' }
	| { name: 'lockDatabase' }
	| { name: 'undo' }
	| { name: 'export' }
	| { name: 'import' }
	| { name: 'lockPage' };

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

export interface ElementType {
	createdAt: string;
	modifiedAt: string;
	id: string | number;
	parentId: string | number | null;
	type: ElementTypesType;
	order: number | string;
	href: string;
	properties: Record<string, unknown> | null;
	operations: OperationsType[];
	children: ElementType[];
}

export interface PageElementProperties {
	name: string;
	icon: string;
	cover: string;
	isSmallText: boolean;
	isFullWidth: boolean;
	isPageLocked: boolean;
}

export interface PageElementType {
	createdAt: string;
	modifiedAt: string;
	id: string | number;
	parentId: string | number | null;
	type: ElementTypesType;
	order: number | string;
	href: string;
	properties: PageElementProperties;
	children: ElementType[];
	operations: PageElementOperationsType[];
}

export interface TextElementPropertiesType {
	name: string;
	textColor: string;
	backgroundColor: string;
}

type TextElementOperationsUnionType = 'turnInto' | 'changeColor' | 'copyParentLink' | 'duplicate' | 'delete' | 'move';

export type TextElementOperationsType = Record<'name', TextElementOperationsUnionType>;

export interface TextElementType {
	createdAt: string;
	modifiedAt: string;
	id: string | number;
	parentId: string | number | null;
	type: TextElementsType;
	order: number | string;
	href: string;
	properties: TextElementPropertiesType;
	operations: TextElementOperationsType[];
	children: ElementType[];
}
