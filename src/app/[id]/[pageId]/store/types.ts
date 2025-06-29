import { Dispatch } from 'react';

export enum PageActionType {
	RENAME_PAGE = 'RENAME_PAGE',
	INITIALIZE_PAGE = 'INITIALIZE_PAGE',
	HANDLE_EDITOR_FOCUS = 'HANDLE_EDITOR_FOCUS',
	CREATE_DEFAULT_ELEMENT = 'CREATE_DEFAULT_ELEMENT',
	RESET_PAGE = 'RESET_PAGE',
}

export type ActionsPayloadType = {
	// [ActionsEnum.TOGGLE_NAVIGATION]: { payload: { isOpen?: boolean; isLocked?: boolean } };
	renamePage: { payload: { name: string } };
	createDefaultElement: { payload: void };
	handleEditorFocus: { payload: void };
};

export type ActionsType = {
	[K in keyof ActionsPayloadType]: {
		type: K;
	} & ActionsPayloadType[K];
}[keyof ActionsPayloadType];

export interface PageStateType {
	page: any;
	focusedElementId: string | null;
}

export interface PageContextType {
	state: PageStateType;
	dispatch: Dispatch<ActionsType>;
}
