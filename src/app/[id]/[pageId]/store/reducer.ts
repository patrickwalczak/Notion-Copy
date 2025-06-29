import { ActionsType, PageStateType } from './types';

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

export const reducer = (state: PageStateType, action: ActionsType): PageStateType => {
	switch (action.type) {
		case 'renamePage': {
			return {
				...state,
				page: {
					...state.page,
					name: action.payload.name,
				},
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
