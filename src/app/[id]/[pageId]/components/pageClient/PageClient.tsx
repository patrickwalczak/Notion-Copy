'use client';

import React, { createContext, RefObject, useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PageFullEntityType } from '@/types/page';
import usePageSetter from './usePageSetter';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { FocusableBlockMapType, FocusableBlockType } from '../../types';
import { createDefaultBlockRequest } from '@/lib/api/block';

export interface PageContextType {
	getFocusableBlocks: () => FocusableBlockMapType;
	focusableBlocks: RefObject<FocusableBlockMapType | null>;
	setFocusedBlock: (focusedBlock: FocusableBlockType) => void;
	focusedBlock: RefObject<FocusableBlockType | null>;
	clearNewElementId: () => void;
	newElementId: RefObject<string>;
	focusPreviousBlock: (id?: string) => void;
	focusNextBlock: (id?: string) => void;
	createDefaultBlock: (pageId: string, order: number) => Promise<void>;
}

export const PageContext = createContext<PageContextType | null>(null);

const PageClient = ({ pageData }: { pageData: PageFullEntityType }) => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const focusableBlocks = useRef<FocusableBlockMapType | null>(null);
	const focusedBlock = useRef<FocusableBlockType | null>(null);
	const newElementId = useRef<string>('');

	usePageSetter(pageData);

	const getFocusableBlocks = () => {
		if (!focusableBlocks.current) focusableBlocks.current = new Map();

		return focusableBlocks.current;
	};

	const setFocusedBlock = (focusableBlock: FocusableBlockType) => {
		focusedBlock.current = focusableBlock;
	};

	const clearNewElementId = () => {
		newElementId.current = '';
	};

	const createDefaultBlock = async (pageId: string, order: number) => {
		try {
			if (!page) return;

			const block = await createDefaultBlockRequest(pageId, order);
			dispatch({ type: 'createDefaultBlock', payload: { block } });
			newElementId.current = block.id;
		} catch (error) {
			// TODO handle errors
		}
	};

	const focusPreviousBlock = (blockId?: string) => {
		const id = blockId || focusedBlock.current?.id;

		if (!focusableBlocks.current || !id) return;

		if (focusedBlock.current?.type === 'pageName') return;

		const elementsArray = Array.from(focusableBlocks.current.values());

		const currentIndex = elementsArray.findIndex(({ id: elId }) => elId === id);

		const previousFocusableElement = elementsArray[currentIndex - 1];

		if (!previousFocusableElement) return;

		const { element } = previousFocusableElement;

		element.focus();
	};

	const focusNextBlock = (blockId?: string) => {
		const id = blockId || focusedBlock.current?.id;

		const elementsArray = Array.from(focusableBlocks.current?.values() || []);

		if (elementsArray.length === 0 || !id || !page) return;

		if (focusedBlock.current?.type === 'pageName') {
			const nextFosuableElement = elementsArray.find(({ type }) => type !== 'pageName');

			if (!nextFosuableElement) {
				createDefaultBlock(page.id, page.elements.length + 1);

				return;
			}

			const { element } = nextFosuableElement;

			element.focus();

			return;
		}

		const isCurrentLast = elementsArray.at(-1)?.id === id || false;

		if (isCurrentLast) {
			if (focusedBlock.current?.element.innerText === '') return;

			createDefaultBlock(page.id, page.elements.length + 1);
			return;
		}

		const nextFocusableIndex = elementsArray.findIndex(({ id: elId }) => elId === id) + 1;
		const elementsArrayLengthWithoutPageTitle = elementsArray.length - 1;

		if (nextFocusableIndex > elementsArrayLengthWithoutPageTitle) {
			createDefaultBlock(page.id, page.elements.length + 1);

			return;
		}

		const { element: nextFocusableElement } = elementsArray[nextFocusableIndex];

		nextFocusableElement.focus();
	};

	const ctx = {
		getFocusableBlocks,
		focusableBlocks,
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
