import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface PageSliceType {
	page: any;
}

const initialState: any = {
	page: null,
	focusedElement: null,
};

const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		renamePage: (state, action: PayloadAction<{ name: string }>) => {
			const { name } = action.payload;
			state.page.name = name;
		},
		initializePage: (state, action: PayloadAction<{ page: any }>) => {
			state.page = action.payload;
		},
		handleEditorFocus: (state) => {
			// When the editor is focused, we want to add a new element to the page or focus on the last default element
			const lastElement = state.page.elements.at(-1);
			const id = Date.now();

			if (!lastElement) {
				state.page.elements.push({
					id,
					order: state.page.elements.length,
					type: 'text',
					properties: {
						color: null,
						backgroundColor: null,
						content: '',
					},
					operations: ['delete', 'duplicate', 'move', 'turnInto'],
				});
				state.page.focusedElement = id;
			} else {
				const {
					type,
					properies: { content },
				} = lastElement;

				if (type === 'text' && !content) state.page.focusedElement = id;
			}
		},
		createDefaultElement: (state) => {
			const id = Date.now();

			state.page.elements.push({
				id,
				order: state.page.elements.length,
				type: 'text',
				properties: {
					color: null,
					backgroundColor: null,
					content: '',
				},
				operations: ['delete', 'duplicate', 'move', 'turnInto'],
			});
			state.page.focusedElement = id;
		},
	},
});

export const { renamePage, initializePage, createDefaultElement, handleEditorFocus } = pageSlice.actions;
export default pageSlice.reducer;
