import { Dispatch } from 'react';
import { ActionsType } from '../../types/types';
import { DeviceType, ThemeModeType } from '@/types/shared';

export type ActionsPayloadType = {
	toggleNavigation: { payload: { isOpen?: boolean; isLocked?: boolean } };
	changeTheme: { payload: ThemeModeType };
	changeDevice: { payload: DeviceType };
};

export interface UserStateType {
	email: string;
	device: DeviceType;
	userPreferences: {
		isNavigationOpen: boolean;
		isNavigationLocked: boolean;
		theme: ThemeModeType;
	};
}

export type UserReducerActionsType = ActionsType<ActionsPayloadType>;

export interface UserContextType {
	state: UserStateType;
	dispatch: Dispatch<UserReducerActionsType>;
}
