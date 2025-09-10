import { PageContext } from '@/app/editor/[pageId]/components/pageClient/PageClient';
import { deleteBlockRequest, duplicateBlockRequest, updateBlockPropertiesRequest } from '@/lib/api/block';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { createContext } from 'react';
import { PagesContext } from '../../providers/pagesProvider/PagesProvider';
import { getElementOrder } from '@/lib/utils/getElementOrder';
import { getPlaceholderBlock } from '../utils/getPlaceholderBlock';
import { OptionalBlocksPropertiesType } from '@/types/block';

interface BlockOperationsContextType {
	deleteBlock: (blockId: string) => Promise<void>;
	duplicateBlock: (blockId: string) => Promise<void>;
	changeColor: (blockId: string, properties: OptionalBlocksPropertiesType) => Promise<void>;
}

export const BlockOperationsContext = createContext<BlockOperationsContextType | null>(null);

const BlockOperationsProvider = ({ children }: { children: React.ReactNode }) => {
	const { focusPrevBlock, newElementId, resetFocusedBlock } = useSafeContext(PageContext);
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const deleteBlock = async (blockId: string) => {
		try {
			dispatch({ type: 'deleteBlock', payload: { blockId } });
			focusPrevBlock(blockId);
			await deleteBlockRequest(blockId);
		} catch (err) {
			console.log(err);
		}
	};

	const duplicateBlock = async (blockId: string) => {
		try {
			if (!page) return;

			const block = page.elements.find((el) => el.id === blockId);
			const currentIndex = page.elements.findIndex((el) => el.id === blockId);

			if (!block) return;

			const nextBlock = page.elements[currentIndex + 1];

			resetFocusedBlock();

			const order = getElementOrder(block.order, nextBlock?.order);

			dispatch({
				type: 'createDefaultBlock',
				payload: {
					block: getPlaceholderBlock(order, page.id),
				},
			});

			const duplicatedBlock = await duplicateBlockRequest({
				blockId,
				pageId: page.id,
				prevOrder: block.order,
				nextOrder: nextBlock?.order,
			});

			dispatch({ type: 'insertBlock', payload: { block: duplicatedBlock } });
			newElementId.current = duplicatedBlock.id;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {}
	};

	const changeColor = async (blockId: string, properties: OptionalBlocksPropertiesType) => {
		try {
			dispatch({ type: 'updateBlockProperties', payload: { blockId, properties } });
			await updateBlockPropertiesRequest({ blockId, properties });

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {}
	};

	const ctx = { deleteBlock, duplicateBlock, changeColor };

	return <BlockOperationsContext.Provider value={ctx}>{children}</BlockOperationsContext.Provider>;
};

export default BlockOperationsProvider;
