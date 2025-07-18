'use client';

import React, { createContext, RefObject, useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PageFullEntityType } from '@/types/page';
import usePageSetter from './usePageSetter';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { BlockMapType, BlockRefType } from '../../types';
import { createDefaultBlockRequest } from '@/lib/api/block';
import { CreateDefaultBlockType } from '@/types/functions.models';
import { handleFocus } from '../../utils';

export interface PageContextType {
	getBlocksRef: () => BlockMapType;
	blocks: RefObject<BlockMapType | null>;
	setFocusedBlock: (focusedBlock: BlockRefType) => void;
	focusedBlock: RefObject<BlockRefType | null>;
	clearNewElementId: () => void;
	newElementId: RefObject<string>;
	focusPreviousBlock: (id?: string) => void;
	focusNextBlock: (id?: string) => void;
	createDefaultBlock: ({ pageId, prevBlockId, nextBlockId }: CreateDefaultBlockType) => Promise<void>;
}

export const PageContext = createContext<PageContextType | null>(null);

const PageClient = ({ pageData }: { pageData: PageFullEntityType }) => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const blocks = useRef<BlockMapType | null>(null);
	const focusedBlock = useRef<BlockRefType | null>(null);
	const newElementId = useRef<string>('');

	usePageSetter(pageData);

	const getBlocksRef = () => {
		if (!blocks.current) blocks.current = new Map();

		return blocks.current;
	};

	const setFocusedBlock = (focusableBlock: BlockRefType) => {
		focusedBlock.current = focusableBlock;
	};

	const clearNewElementId = () => {
		newElementId.current = '';
	};

	const createDefaultBlock = async ({ pageId, prevBlockId, nextBlockId }: CreateDefaultBlockType) => {
		try {
			if (!page) return;

			const block = await createDefaultBlockRequest({ pageId, prevBlockId, nextBlockId });
			dispatch({ type: 'createDefaultBlock', payload: { block } });
			newElementId.current = block.id;
		} catch (error) {
			// TODO handle errors
		}
	};

	function getFocusableElement(direction: 'previous' | 'next', blockId?: string): BlockRefType | null {
		if (!blocks.current || !page) return null;

		const currBlockId = blockId || focusedBlock.current?.id;
		if (!currBlockId) return null;

		const isPageTitleFocused = focusedBlock.current?.type === 'pageName';

		// Case: Page title is focused
		if (isPageTitleFocused) {
			if (direction === 'previous') return null;

			const nextBlock = page.elements.find((el) => el.isFocusable);
			return nextBlock ? blocks.current.get(nextBlock.id) ?? null : null;
		}

		// Case: Find current index in page.elements
		const index = page.elements.findIndex((el) => el.id === currBlockId);
		if (index === -1) return null;

		// Case: ArrowUp from first block → focus page title
		if (direction === 'previous' && index === 0) {
			const pageTitleRef = blocks.current.get(page.id);
			return pageTitleRef ? pageTitleRef : null;
		}

		// Get target block by direction
		const targetIndex = direction === 'previous' ? index - 1 : index + 1;
		const target = page.elements[targetIndex];

		if (!target || !target.isFocusable) return null;

		return blocks.current.get(target.id) ?? null;
	}

	const handleFocusableElement = (direction: 'previous' | 'next', blockId?: string) => {
		const block = getFocusableElement(direction, blockId);
		if (block) handleFocus(block.element);
	};

	const focusNextBlock = () => handleFocusableElement('next');

	const focusPreviousBlock = (blockId?: string) => handleFocusableElement('previous', blockId);

	const ctx = {
		getBlocksRef,
		blocks,
		focusedBlock,
		setFocusedBlock,
		clearNewElementId,
		newElementId,
		focusPreviousBlock,
		focusNextBlock,
		createDefaultBlock,
	};

	return (
		<PageContext.Provider value={ctx}>
			<div className={`flex-grow-1`}>
				<PageHeader>
					<EditPageName />
				</PageHeader>
				<PageEditor />
			</div>
		</PageContext.Provider>
	);
};

export default PageClient;
