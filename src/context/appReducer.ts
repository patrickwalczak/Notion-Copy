import { ActionsEnum, AppStateType, ActionsType } from './types';

export const reducer = (state: AppStateType, action: ActionsType) => {
	switch (action.type) {
		case ActionsEnum.TOGGLE_NAVIGATION: {
			return {
				...state,
				isNavigationOpen: !state.isNavigationOpen,
			};
		}
		default:
			return state;
	}
};

export const initialState: AppStateType = {
	isNavigationOpen: true,
};
