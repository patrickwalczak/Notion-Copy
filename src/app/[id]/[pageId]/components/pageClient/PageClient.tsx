'use client';

import React, { createContext, RefObject, useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PageFullEntityType } from '@/types/page';
import usePageSetter from './usePageSetter';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { BlockMapType, FocusableBlockType } from '../../types';
import { createDefaultBlockRequest } from '@/lib/api/block';
import { placeCaretAtEnd } from '@/lib/utils/dom';

export interface PageContextType {
	getFocusableBlocks: () => BlockMapType;
	blocks: RefObject<BlockMapType | null>;
	setFocusedBlock: (focusedBlock: FocusableBlockType) => void;
	focusedBlock: RefObject<FocusableBlockType | null>;
	clearNewElementId: () => void;
	newElementId: RefObject<string>;
	focusPreviousBlock: (id?: string) => void;
	focusNextBlock: (id?: string) => void;
	createDefaultBlock: (pageId: string, order: number) => Promise<void>;
}

export const PageContext = createContext<PageContextType | null>(null);

const handleFocus = (element: HTMLElement) => {
	element.focus();
	requestAnimationFrame(() => placeCaretAtEnd(element));
};

const PageClient = ({ pageData }: { pageData: PageFullEntityType }) => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const blocks = useRef<null>(null);
	const focusedBlock = useRef<FocusableBlockType | null>(null);
	const newElementId = useRef<string>('');

	usePageSetter(pageData);

	const getFocusableBlocks = () => {
		if (!blocks.current) blocks.current = new Map();

		return blocks.current;
	};

	const setFocusedBlock = (focusableBlock: FocusableBlockType) => {
		focusedBlock.current = focusableBlock;
	};

	const clearNewElementId = () => {
		newElementId.current = '';
	};

	const createDefaultBlock = async (pageId: string, prevBlockId?: string, nextBlockId?: string) => {
		try {
			if (!page) return;

			const block = await createDefaultBlockRequest(pageId, prevBlockId, nextBlockId);
			dispatch({ type: 'createDefaultBlock', payload: { block } });
			newElementId.current = block.id;
		} catch (error) {
			// TODO handle errors
		}
	};

	const focusPreviousBlock = (blockId?: string) => {
		const id = blockId || focusedBlock.current?.id;

		if (!blocks.current || !id) return;

		if (focusedBlock.current?.type === 'pageName') return;

		const elementsArray = Array.from(blocks.current.values());

		const currentIndex = elementsArray.findIndex(({ id: elId }) => elId === id);

		const previousFocusableElement = elementsArray[currentIndex - 1];

		if (!previousFocusableElement) return;

		const { element } = previousFocusableElement;

		handleFocus(element);
	};

	function getNextFocusableBlock(): FocusableBlockType | null {
		if (!blocks.current || !focusedBlock.current) return null;

		let foundCurrent = false;

		for (const block of blocks.current.values()) {
			if (!block.isFocusable) continue;

			if (foundCurrent) {
				return block; // this is the next focusable after the current one
			}

			if (block.id === focusedBlock.current.id) {
				foundCurrent = true;
			}
		}

		return null; // reached the end or current not found
	}

	const focusNextBlock = async () => {
		const block = getNextFocusableBlock();
		if (!block) return;
		handleFocus(block.element);
	};

	const ctx = {
		getFocusableBlocks,
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
