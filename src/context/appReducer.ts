import { detectThemeMode } from '@/utils/detectThemeMode';
import { ActionsEnum, AppStateType, ActionsType } from './types';
import { DeviceType } from '@/types/shared';

export const reducer = (state: AppStateType, action: ActionsType) => {
	switch (action.type) {
		case ActionsEnum.TOGGLE_NAVIGATION: {
			return {
				...state,
				isNavigationOpen: action.payload.isOpen,
			};
		}
		case ActionsEnum.CHANGE_DEVICE: {
			return {
				...state,
				device: action.payload,
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

export const createInitialState = (device: DeviceType): AppStateType => ({
	isNavigationOpen: false,
	mode: detectThemeMode(),
	device,
});
