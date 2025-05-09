import { Dispatch } from 'react';

export enum ActionsEnum {
	UPDATE_TITLE = 'UPDATE_TITLE',
}

export type ActionsPayloadType = {
	[ActionsEnum.UPDATE_TITLE]: {};
};

export type ActionsType = {
	[K in keyof ActionsPayloadType]: {
		type: K;
	} & ActionsPayloadType[K];
}[keyof ActionsPayloadType];

export interface PageStateType {
	id: string;
	title: string;
	icon: string;
	cover: string;
	type: string;
	children: PageStateType[];
	parentId: string | null;
}

export interface PageContextType {
	state: PageStateType;
	dispatch: Dispatch<ActionsType>;
}
