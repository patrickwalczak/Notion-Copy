'use client';

import React, { createContext, RefObject, useRef } from 'react';
import PageHeader from '@/app/editor/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import usePageSetter from './usePageSetter';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { BlockMapType, BlockRefType } from '../../types';
import { createDefaultBlockRequest } from '@/lib/api/block';
import { CreateDefaultBlockType } from '@/types/functions.models';
import { handleFocus } from '../../utils';
import { mergeClasses } from '@/lib/utils/mergeClasses';
import { PageWithBlocksAndSubpages } from '@/types/page';

export interface PageContextType {
	getBlocksRef: () => BlockMapType;
	blocks: RefObject<BlockMapType | null>;
	setFocusedBlock: (focusedBlock: BlockRefType) => void;
	focusedBlock: RefObject<BlockRefType | null>;
	clearNewElementId: () => void;
	newElementId: RefObject<string>;
	focusPrevBlock: (id?: string) => void;
	focusNextBlock: (id?: string) => void;
	createDefaultBlock: ({ pageId, prevOrder, nextOrder }: CreateDefaultBlockType) => Promise<void>;
}

export const PageContext = createContext<PageContextType | null>(null);

const PageClient = ({ pageData }: { pageData: PageWithBlocksAndSubpages }) => {
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

	const createDefaultBlock = async ({ pageId, prevOrder, nextOrder }: CreateDefaultBlockType) => {
		try {
			if (!page) return;

			const block = await createDefaultBlockRequest({ pageId, prevOrder, nextOrder });
			dispatch({ type: 'createDefaultBlock', payload: { block } });
			newElementId.current = block.id;
		} catch (error) {
			console.log(error);
			// TODO handle errors
		}
	};

	function getFocusableElement(direction: 'previous' | 'next', blockId?: string): BlockRefType | null {
		if (!blocks.current || !page) return null;

		const currBlockId = blockId || focusedBlock.current?.id;
		if (!currBlockId) return null;

		const isPageTitleFocused = focusedBlock.current?.type === 'pageName';

		if (isPageTitleFocused) {
			if (direction === 'previous') return null;

			const nextBlock = page.elements.find((el) => el.isFocusable);
			return nextBlock ? blocks.current.get(nextBlock.id) ?? null : null;
		}

		const index = page.elements.findIndex((el) => el.id === currBlockId);
		if (index === -1) return null;

		if (direction === 'previous' && index === 0) {
			const pageTitleRef = blocks.current.get(page.id);
			return pageTitleRef ?? null;
		}

		let i = direction === 'previous' ? index - 1 : index + 1;

		while (i >= 0 && i < page.elements.length) {
			const el = page.elements[i];
			if (el.isFocusable) {
				return blocks.current.get(el.id) ?? null;
			}
			i = direction === 'previous' ? i - 1 : i + 1;
		}

		return null;
	}

	const handleFocusableElement = (direction: 'previous' | 'next', blockId?: string) => {
		const block = getFocusableElement(direction, blockId);
		if (block) handleFocus(block.element);
	};

	const focusNextBlock = () => handleFocusableElement('next');

	const focusPrevBlock = (blockId?: string) => handleFocusableElement('previous', blockId);

	const ctx = {
		getBlocksRef,
		blocks,
		focusedBlock,
		setFocusedBlock,
		clearNewElementId,
		newElementId,
		focusPrevBlock,
		focusNextBlock,
		createDefaultBlock,
	};

	return (
		<PageContext.Provider value={ctx}>
			<div className={mergeClasses('flex-grow-1')}>
				<PageHeader>
					<EditPageName />
				</PageHeader>
				<PageEditor />
			</div>
		</PageContext.Provider>
	);
};

export default PageClient;
