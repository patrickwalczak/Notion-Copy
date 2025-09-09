import { BlocksUnionType, TextElementOperationsType } from '@/types/block';

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

export const TEXT_ELEMENT_OPERATIONS = [
	'turnInto',
	'changeColor',
	'copyParentLink',
	'duplicate',
	'move',
	'delete',
] as const;

type BlocksOperationsUnionType = TextElementOperationsType;

export const BLOCK_OPERATIONS: Record<BlocksUnionType, BlocksOperationsUnionType[]> = {
	text: ['turnInto', 'changeColor', 'copyParentLink', 'duplicate', 'move', 'delete'],
	placeholder: [],
};
