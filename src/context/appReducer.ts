import { detectThemeMode } from '@/utils/detectThemeMode';
import { ActionsEnum, AppStateType, ActionsType } from './types';

export const reducer = (state: AppStateType, action: ActionsType) => {
	switch (action.type) {
		case ActionsEnum.TOGGLE_NAVIGATION: {
			return {
				...state,
				isNavigationOpen: action?.payload ?? !state.isNavigationOpen,
			};
		}
		case ActionsEnum.CHANGE_MODE: {
			return {
				...state,
				mode: action.payload,
			};
		}
		default:
			return state;
	}
};

export const createInitialState = (): AppStateType => ({
	isNavigationOpen: false,
	mode: detectThemeMode(),
});
