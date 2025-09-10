import { EditorElementsOperations, EditorElementTypes } from '@/types/elements';

export const PAGE_OPERATIONS = [
	'turnInto',
	'color',
	'editIcon',
	'addToFavorites',
	'rename',
	'openInNewTab',
	'openInSidePeek',
	'copyLink',
	'duplicate',
	'move',
	'delete',
] as const;

export const TEXT_ELEMENT_OPERATIONS = ['turnInto', 'color', 'copyParentLink', 'duplicate', 'move', 'delete'] as const;

export const PLACEHOLDER_ELEMENT_OPERATIONS = [] as const;

export const ELEMENTS_OPERATIONS: Record<EditorElementTypes, EditorElementsOperations[]> = {
	text: [...TEXT_ELEMENT_OPERATIONS],
	placeholder: [],
	page: [...PAGE_OPERATIONS],
};
