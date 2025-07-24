import { Dispatch } from 'react';
import { ActionsType } from '../types';
import { PageEntityType, PageForContextType, PageFullEntityType } from '@/types/page';
import { BlockBaseType } from '@/types/block';

export type ActionsPayloadType = {
	renamePage: { payload: { pageId: string; newName: string } };
	setPage: { payload: { page: PageFullEntityType | null } };
	updateBlockName: { payload: { blockId: string; newName: string } };
	createDefaultBlock: { payload: { block: BlockBaseType } };
	deleteBlock: { payload: { blockId: string } };
	addPage: { payload: { parentId?: string; newSubpage: PageEntityType } };
	removePage: { payload: { pageId: string } };
	restorePage: { payload: { pageId: string } };
};

export interface PagesReducerState {
	pages: PageEntityType[];
	page: PageForContextType | null;
	removedPage: PageEntityType | null;
}

export type PagesReducerActionsType = ActionsType<ActionsPayloadType>;

export interface PagesContextType {
	state: PagesReducerState;
	dispatch: Dispatch<PagesReducerActionsType>;
}
