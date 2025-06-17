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

export interface PagesSliceType {
	pages: any[];
}

const initialState: PagesSliceType = {
	pages: [],
};

const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		createPage: (state, action) => {
			state.pages.unshift(action.payload);
		},
		deletePage: (state, action) => {},
		duplicatePage: (state, action) => {},
		movePage: (state, action) => {},
		renamePage: (state, action: PayloadAction<{ id: string | number | null; name: string }>) => {
			const { id, name } = action.payload;

			const index = state.pages.findIndex((page) => String(page.id) === String(id));

			if (index === -1) return;

			state.pages[index] = {
				...state.pages[index],
				name,
			};
		},
		addPageToFavorites: (state, action) => {},
		initializePages: (state, action) => {
			state.pages = action.payload;
		},
	},
});

export const { createPage, deletePage, duplicatePage, movePage, renamePage, addPageToFavorites, initializePages } =
	pagesSlice.actions;
export default pagesSlice.reducer;
