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
			return state;
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
