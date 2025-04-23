import { DeviceType } from '@/types/shared';
import { ThemeMode } from '@/types/themeMode';
import { Dispatch } from 'react';

export enum ActionsEnum {
	TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION',
	CHANGE_DEVICE = 'CHANGE_DEVICE',
	CHANGE_MODE = 'CHANGE_MODE',
}

export type ActionsPayloadType = {
	[ActionsEnum.TOGGLE_NAVIGATION]: { payload: { isOpen?: boolean; isLocked?: boolean } };
	[ActionsEnum.CHANGE_DEVICE]: { payload: DeviceType };
	[ActionsEnum.CHANGE_MODE]: { payload: ThemeMode };
};

export type ActionsType = {
	[K in keyof ActionsPayloadType]: {
		type: K;
	} & ActionsPayloadType[K];
}[keyof ActionsPayloadType];

export interface AppStateType {
	isNavigationLocked: boolean;
	isNavigationOpen: boolean;
	device: DeviceType;
	mode: ThemeMode;
}

export interface AppContextType {
	state: AppStateType;
	dispatch: Dispatch<ActionsType>;
}
