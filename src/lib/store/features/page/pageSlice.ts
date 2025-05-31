import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageType {
	id: number;
	name: string;
	icon: string;
	type: string;
	children: PageType[];
	parentId: number | null;
}

interface PageDbType {
	createdAt: Date;
	modifiedAt: Date;
	id: number | string;
	name: string;
	icon: string;
	cover: string; // cover image url
	parentId: number | null;
	children: PageDbType[];
	elements: [
		{
			type: any; // link, h1, h2, h3, h4, h5, h6, p, img, quote,
			content: any;
		}
	];
}

export interface PageSliceType {
	page: any;
}

const initialState: PageSliceType = {
	page: null,
};

const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		renamePage: (state, action: PayloadAction<{ name: string }>) => {
			const { name } = action.payload;
			state.page.name = name;
		},
		initState: (state, action: PayloadAction<{ page: any }>) => {
			state.page = action.payload;
		},
	},
});

export const { renamePage, initState } = pageSlice.actions;
export default pageSlice.reducer;
