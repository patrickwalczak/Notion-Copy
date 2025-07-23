import { PageContext } from '@/app/editor/[pageId]/components/pageClient/PageClient';
import { deleteBlockRequest } from '@/lib/api/block';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { createContext } from 'react';
import { PagesContext } from '../pagesContext/PagesProvider';

interface BlockOperationsContextType {
	deleteBlock: (blockId: string) => Promise<void>;
	duplicateBlock: (blockId: string) => Promise<void>;
}

export const BlockOperationsContext = createContext<BlockOperationsContextType | null>(null);

const BlockOperationsProvider = ({ children }: { children: React.ReactNode }) => {
	const { focusPreviousBlock } = useSafeContext(PageContext);
	const { dispatch } = useSafeContext(PagesContext);

	const deleteBlock = async (blockId: string) => {
		try {
			dispatch({ type: 'deleteBlock', payload: { blockId } });
			focusPreviousBlock(blockId);
			await deleteBlockRequest(blockId);
		} catch (err) {
			console.log(err);
		}
	};

	const duplicateBlock = async (blockId: string) => {
		try {
		} catch (err) {}
	};

	const ctx = { deleteBlock, duplicateBlock };

	return <BlockOperationsContext.Provider value={ctx}>{children}</BlockOperationsContext.Provider>;
};

export default BlockOperationsProvider;
