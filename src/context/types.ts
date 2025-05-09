import { DeviceType } from '@/types/shared';
import { ThemeMode } from '@/types/themeMode';
import { Dispatch } from 'react';

export enum ActionsEnum {
	TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION',
	CHANGE_DEVICE = 'CHANGE_DEVICE',
	CHANGE_MODE = 'CHANGE_MODE',
	CREATE_PAGE = 'CREATE_PAGE',
}

export type ActionsPayloadType = {
	[ActionsEnum.TOGGLE_NAVIGATION]: { payload: { isOpen?: boolean; isLocked?: boolean } };
	[ActionsEnum.CHANGE_DEVICE]: { payload: DeviceType };
	[ActionsEnum.CHANGE_MODE]: { payload: ThemeMode };
	[ActionsEnum.CREATE_PAGE]: { payload: any };
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
	pages: any[];
}

export interface AppContextType {
	state: AppStateType;
	dispatch: Dispatch<ActionsType>;
}
