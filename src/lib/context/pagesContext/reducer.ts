import { PagesReducerActionsType, PagesStateType } from './types';
import { initialState } from './initialState';

interface PageType {
	id: number;
	name: string;
	icon: string;
	type: string;
	children: PageType[];
	parentId: number | null;
}

interface TextElementType {
	id: string;
	order: number;
	type: 'text' | 'h1' | 'h2' | 'h3';
	link: string;
	properties: {
		color: null;
		backgroundColor: null;
		content: string;
	};
	operations: OperationsTye[];
}

type OperationsTye = 'delete' | 'duplicate' | 'move' | 'turnInto';

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
			const { id, name } = action.payload;

			const index = state.pages.findIndex((page) => String(page.id) === String(id));

			if (index === -1) return state;

			return {
				...state,
				pages: [
					...state.pages.slice(0, index),
					{
						...state.pages[index],
						name,
					},
					...state.pages.slice(index + 1),
				],
			};
		}
		case 'handleEditorFocus': {
			const lastElement = state.page.elements.at(-1);
			const id = Date.now();

			if (!lastElement) {
				const newElement = {
					id,
					order: state.page.elements.length,
					type: 'text',
					properties: {
						color: null,
						backgroundColor: null,
						content: '',
					},
					operations: ['delete', 'duplicate', 'move', 'turnInto'],
				};

				return {
					...state,
					page: {
						...state.page,
						elements: [...state.page.elements, newElement],
						focusedElement: id,
					},
				};
			} else {
				const { type, properties } = lastElement;

				if (type === 'text' && !properties.content) {
					return {
						...state,
						page: {
							...state.page,
							focusedElement: lastElement.id,
						},
					};
				}
				return state;
			}
		}

		case 'createDefaultElement': {
			const id = Date.now();
			const newElement = {
				id,
				order: state.page.elements.length,
				type: 'text',
				properties: {
					color: null,
					backgroundColor: null,
					content: '',
				},
				operations: ['delete', 'duplicate', 'move', 'turnInto'],
			};

			return {
				...state,
				page: {
					...state.page,
					elements: [...state.page.elements, newElement],
					focusedElement: id,
				},
			};
		}
		default:
			return state;
	}
};
