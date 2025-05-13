import { ActionsEnum, PageStateType, ActionsType } from './types';

export const reducer = (state: PageStateType, action: ActionsType) => {
	switch (action.type) {
		case ActionsEnum.UPDATE_TITLE: {
			return {
				...state,
				title: action.payload,
			};
		}
		default:
			return state;
	}
};

export const initialState: PageStateType = {
	id: '',
	title: 'New Page',
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
