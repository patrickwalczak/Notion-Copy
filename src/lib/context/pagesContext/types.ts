import { Dispatch } from 'react';
import { ActionsType } from '../types';
import { PageEntityType, PageForContextType, PageFullEntityType } from '@/types/page';
import { BlockBaseType } from '@/types/block';

export type ActionsPayloadType = {
	renamePage: { payload: { pageId: string; newName: string } };
	setPage: { payload: { page: PageFullEntityType | null } };
	updateBlockName: { payload: { blockId: string; newName: string } };
	createDefaultBlock: { payload: { block: BlockBaseType } };
};

export interface PagesReducerState {
	pages: PageEntityType[];
	page: PageForContextType | null;
}

export type PagesReducerActionsType = ActionsType<ActionsPayloadType>;

export interface PagesContextType {
	state: PagesReducerState;
	dispatch: Dispatch<PagesReducerActionsType>;
}
