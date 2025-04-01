import { Dispatch } from 'react';

export enum ActionsEnum {
	TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION',
}

export type ActionsPayloadType = {
	[ActionsEnum.TOGGLE_NAVIGATION]: { payload: string };
};

export type ActionsType = {
	[K in keyof ActionsPayloadType]: {
		type: K;
	} & ActionsPayloadType[K];
}[keyof ActionsPayloadType];

export interface AppStateType {
	isNavigationOpen: boolean;
}

export interface AppContextType {
	state: AppStateType;
	dispatch: Dispatch<ActionsType>;
}
