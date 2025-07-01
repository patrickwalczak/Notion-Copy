import { PageElementType, TextElementType } from '@/types';
import { PagesReducerActionsType, PagesStateType } from './types';

const examplePage: PageElementType = {
	createdAt: '2025-05-01',
	modifiedAt: '2025-05-01',
	id: 1,
	parentId: null,
	type: 'page',
	order: 0,
	href: '',
	properties: {
		name: 'Roadmap',
		icon: '',
		cover: '',
		isSmallText: false,
		isFullWidth: false,
		isPageLocked: false,
	},
	children: [],
	operations: [
		{ name: 'copyLink' },
		{ name: 'duplicate' },
		{ name: 'delete' },
		{ name: 'rename' },
		{ name: 'move' },
		{ name: 'addToFavorites' },
		{ name: 'undo' },
		{ name: 'export' },
		{ name: 'import' },
		{ name: 'lockPage' },
	],
};

const textElement: TextElementType = {
	createdAt: '2025-07-01',
	modifiedAt: '2025-07-01',
	id: 101,
	parentId: 1,
	type: 'text', // assuming 'text' is part of your TextElementsType union
	order: 0,
	href: '',
	properties: {
		name: 'This is a sample text element.',
		textColor: '',
		backgroundColor: '',
	},
	operations: [
		{ name: 'turnInto' },
		{ name: 'changeColor' },
		{ name: 'copyParentLink' },
		{ name: 'duplicate' },
		{ name: 'delete' },
		{ name: 'move' },
	],
	children: [],
};

export const reducer = (state: PagesStateType, action: PagesReducerActionsType): PagesStateType => {
	switch (action.type) {
		case 'setPage': {
			return {
				...state,
				page: action.payload,
			};
		}
		case 'createPage': {
			return state;
		}
		case 'renamePage': {
			return state;
		}
		case 'handleEditorFocus': {
			const lastElement = state.page.elements.at(-1);
			const id = Date.now();

			return state;
		}
		case 'createDefaultElement': {
			return {
				...state,
			};
		}
		case 'updateElement': {
			return {
				...state,
			};
		}
		default:
			return state;
	}
};
