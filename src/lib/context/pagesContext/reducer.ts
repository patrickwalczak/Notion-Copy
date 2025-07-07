import { PagesReducerActionsType, PagesStateType } from './types';

export const reducer = (state: PagesStateType, action: PagesReducerActionsType): PagesStateType => {
	switch (action.type) {
		case 'setPage': {
			return {
				...state,
				page: action.payload,
			};
		}
		case 'createPage': {
			return {
				...state,
				pages: [action.payload, ...state.pages],
			};
		}
		case 'renamePage': {
			const { pageId, newName } = action.payload;

			if (!state.page || !pageId) return state;

			const page =
				state.page.id === pageId
					? {
							...state.page,
							properties: {
								...state.page.properties,
								name: newName,
							},
					  }
					: state.page;

			const index = state.pages.findIndex((p) => p.id === pageId);

			const pages =
				index !== -1
					? state.pages.with(index, {
							...state.pages[index],
							properties: {
								...state.pages[index].properties,
								name: newName,
							},
					  })
					: state.pages;

			return { ...state, page, pages };
		}

		case 'handleEditorFocus': {
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
