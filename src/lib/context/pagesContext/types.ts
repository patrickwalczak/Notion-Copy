import { Dispatch } from 'react';
import { ActionsType } from '../types';
import { PageElementSimpleType, PageElementType } from '@/types/page';

export type ActionsPayloadType = {
	createPage: { payload: any };
	renamePage: { payload: any };
	createDefaultElement: { payload: any };
	handleEditorFocus: { payload: any };
	setPage: { payload: any };
	updateElement: { payload: any };
};

export interface PagesStateType {
	pages: PageElementSimpleType[];
	page: PageElementType | null;
	focusedElementId: string | null;
}

export type PagesReducerActionsType = ActionsType<ActionsPayloadType>;

export interface PagesContextType {
	state: PagesStateType;
	dispatch: Dispatch<PagesReducerActionsType>;
}
