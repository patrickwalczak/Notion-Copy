import { ActionsEnum, PageStateType, ActionsType } from './types';

export const reducer = (state: PageStateType, action: ActionsType) => {
	switch (action.type) {
		// case ActionsEnum.TOGGLE_NAVIGATION: {
		// 	return {
		// 		...state,
		// 		isNavigationOpen: action.payload?.isOpen ?? state.isNavigationOpen,
		// 		isNavigationLocked: action.payload?.isLocked ?? state.isNavigationLocked,
		// 	};
		// }
		// case ActionsEnum.CHANGE_DEVICE: {
		// 	return {
		// 		...state,
		// 		device: action.payload,
		// 	};
		// }
		// case ActionsEnum.CHANGE_MODE: {
		// 	return {
		// 		...state,
		// 		mode: action.payload,
		// 	};
		// }
		// case ActionsEnum.CREATE_PAGE: {
		// 	return {
		// 		...state,
		// 		pages: [...state.pages, page],
		// 	};
		// }
		default:
			return state;
	}
};

export const initialState: PageStateType = {
	id: '',
	title: '',
	icon: '',
	cover: '',
	type: '',
	children: [],
	parentId: null,
};

const page = {
	id: 0,
	title: '',
	icon: '',
	type: '', // page | table | text | image | video | audio | file
	data: {},
	children: [],
	parentId: null,
};
