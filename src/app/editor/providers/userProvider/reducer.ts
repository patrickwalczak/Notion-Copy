import { UserReducerActionsType, UserStateType } from './types';

export const reducer = (state: UserStateType, action: UserReducerActionsType): UserStateType => {
	switch (action.type) {
		case 'toggleNavigation': {
			return {
				...state,
				userPreferences: {
					...state.userPreferences,
					isNavigationOpen: action.payload.isOpen ?? state.userPreferences.isNavigationOpen,
					isNavigationLocked: action.payload.isLocked ?? state.userPreferences.isNavigationLocked,
				},
			};
		}
		case 'changeDevice': {
			return {
				...state,
				device: action.payload,
			};
		}
		case 'changeTheme': {
			return {
				...state,
				userPreferences: {
					...state.userPreferences,
					theme: action.payload,
				},
			};
		}
		default:
			return state;
	}
};
