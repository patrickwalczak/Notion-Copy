import { Dispatch } from 'react';
import { ActionsType } from '../types';

export type ActionsPayloadType = {
	createPage: { payload: any };
	renamePage: { payload: any };
	createDefaultElement: { payload: any };
	handleEditorFocus: { payload: any };
	setPage: { payload: any };
};

export interface PagesStateType {
	pages: any;
	page: any;
	focusedElementId: string | null;
}

export type PageReducerActionsType = ActionsType<ActionsPayloadType>;

export interface PageContextType {
	state: PagesStateType;
	dispatch: Dispatch<PageReducerActionsType>;
}
