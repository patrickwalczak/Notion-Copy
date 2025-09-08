import { Dispatch } from 'react';
import { ActionsType } from '../types';
import { BlockElementType } from '@/types/block';
import { PageTreeType, PageWithBlocksAndSubpages, PageWithElements } from '@/types/page';

// TODO any
export type ActionsPayloadType = {
	renamePage: { payload: { pageId: string; newName: string } };
	setPage: { payload: { page: PageWithBlocksAndSubpages | null } };
	updateBlockName: { payload: { blockId: string; newName: string } };
	createDefaultBlock: { payload: { block: BlockElementType } };
	deleteBlock: { payload: { blockId: string } };
	addPage: { payload: { parentId?: string; newSubpage: any } };
	removePage: { payload: { pageId: string } };
	restorePage: { payload: { pageId: string } };
};

export interface PagesReducerState {
	pages: PageTreeType[];
	page: PageWithElements | null;
	removedPage: PageWithElements | null;
}

export type PagesReducerActionsType = ActionsType<ActionsPayloadType>;

export interface PagesContextType {
	state: PagesReducerState;
	dispatch: Dispatch<PagesReducerActionsType>;
}
