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
			console.log(action.payload);

			state.page = action.payload;
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

export const { renamePage, initializePage, createDefaultElement } = pageSlice.actions;
export default pageSlice.reducer;
