import { Dispatch } from 'react';
import { ActionsType } from '../types';
import { BlockBaseType } from '@/types/block';
import { PageTreeType } from '@/types/page';

export type ActionsPayloadType = {
	renamePage: { payload: { pageId: string; newName: string } };
	setPage: { payload: { page: any | null } };
	updateBlockName: { payload: { blockId: string; newName: string } };
	createDefaultBlock: { payload: { block: BlockBaseType } };
	deleteBlock: { payload: { blockId: string } };
	addPage: { payload: { parentId?: string; newSubpage: any } };
	removePage: { payload: { pageId: string } };
	restorePage: { payload: { pageId: string } };
};

export interface PagesReducerState {
	pages: PageTreeType[];
	page: any | null;
	removedPage: any | null;
}

export type PagesReducerActionsType = ActionsType<ActionsPayloadType>;

export interface PagesContextType {
	state: PagesReducerState;
	dispatch: Dispatch<PagesReducerActionsType>;
}
