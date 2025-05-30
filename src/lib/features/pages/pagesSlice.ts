import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageType {
	id: number;
	title: string;
	icon: string;
	cover: string;
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
	activePageId: number | string | null;
	page: any;
}

const initialState: PagesSliceType = {
	pages: [
		{
			id: 0,
			name: '',
			icon: '',
			cover: '',
			type: 'page',
			children: [],
			parentId: null,
			isSaved: false,
		},
	],
	activePageId: 0,
	page: { id: 0, name: '', icon: '', cover: '', type: 'page', children: [], parentId: null, isSaved: false },
};

const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		createPage: (state, action) => {
			state.pages.push(action.payload);
			state.activePageId = action.payload.id;
			state.page = action.payload;
		},
		editPage: (state, action: PayloadAction<{ property: string; value: any }>) => {},
		deletePage: (state, action) => {},
		duplicatePage: (state, action) => {},
		movePage: (state, action) => {},
		renamePage: (state, action: PayloadAction<{ id: PagesSliceType['activePageId']; name: string }>) => {
			const { id, name } = action.payload;

			if (id === state.activePageId) {
				state.page.name = name;
				const index = state.pages.findIndex((page) => page.id === id);
				if (index !== -1) {
					state.pages[index] = {
						...state.pages[index],
						name,
					};
				}
			}
		},
		addPageToFavorites: (state, action) => {},
		changeActivePageId: (state, action: PayloadAction<PagesSliceType['activePageId']>) => {
			state.activePageId = action.payload;
		},
	},
});

export const { createPage, editPage, deletePage, duplicatePage, movePage, renamePage, addPageToFavorites } =
	pagesSlice.actions;
export default pagesSlice.reducer;
