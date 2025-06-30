import { Dispatch } from 'react';
import { ActionsType } from '../types';
import { DeviceType, ThemeModeType } from '@/types/shared';

export type ActionsPayloadType = {
	toggleNavigation: { payload: { isOpen?: boolean; isLocked?: boolean } };
	changeTheme: { payload: any };
	changeDevice: { payload: any };
};

export interface UserStateType {
	username: string;
	userId: string;
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
