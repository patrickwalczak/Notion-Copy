'use client';

import React, { createContext, RefObject, useCallback, useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PageFullEntityType } from '@/types/page';
import usePageSetter from './usePageSetter';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { placeCaretAtEnd } from '@/lib/utils/dom';
import { FocusableBlockMapType, FocusableBlockType } from '../../types';

export interface PageContextType {
	getFocusableBlocks: () => FocusableBlockMapType;
	focusableBlocks: RefObject<FocusableBlockMapType | null>;
	setFocusedBlock: (focusedBlock: FocusableBlockType) => void;
	focusedBlock: RefObject<FocusableBlockType | null>;
	clearNewElementId: () => void;
	newElementId: RefObject<string>;
	focusPreviousBlock: (id?: string) => void;
	focusNextBlock: (id?: string) => void;
}

export const PageContext = createContext<PageContextType | null>(null);

const PageClient = ({ pageData }: { pageData: PageFullEntityType }) => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	const focusableBlocks = useRef<FocusableBlockMapType | null>(null);
	const focusedBlock = useRef<FocusableBlockType | null>(null);
	const newElementId = useRef<string>('');

	usePageSetter(pageData);

	const getFocusableBlocks = useCallback(() => {
		if (!focusableBlocks.current) focusableBlocks.current = new Map();

		return focusableBlocks.current;
	}, []);

	const setFocusedBlock = (focusableBlock: FocusableBlockType) => {
		focusedBlock.current = focusableBlock;
	};

	const clearNewElementId = () => {
		newElementId.current = '';
	};

	const focusPreviousBlock = useCallback((blockId?: string) => {
		const id = blockId || focusedBlock.current?.id;

		if (!focusableBlocks.current || !id) return;

		if (focusedBlock.current?.type === 'pageName') return;

		const elementsArray = Array.from(focusableBlocks.current);

		const currentIndex = elementsArray.findIndex(([elementId]) => elementId === id);

		const previousFocusableElement = elementsArray[currentIndex - 1];

		if (!previousFocusableElement) return;

		const [, { element }] = previousFocusableElement;

		element.focus();
		placeCaretAtEnd(element);
	}, []);

	const focusNextBlock = useCallback((blockId?: string) => {
		console.log(focusableBlocks.current);

		const id = blockId || focusedBlock.current?.id;

		if (!focusableBlocks.current || !id) return;

		const elementsArray = Array.from(focusableBlocks.current);

		if (focusedBlock.current?.type === 'pageName') {
			const nextFosuableElement = elementsArray.find(([, element]) => element.type !== 'pageName');

			if (!nextFosuableElement) {
				// TODO create a new element

				return;
			}

			const [, { element }] = nextFosuableElement;

			element.focus();
			placeCaretAtEnd(element);

			return;
		}

		const isCurrentLast = elementsArray.at(-1)?.[0] === id;

		if (isCurrentLast) {
			if (focusedBlock.current?.element.innerHTML === '') return;
			// create a new element
			return;
		}

		const nextFocusableIndex = elementsArray.findIndex(([elementId]) => elementId === id) + 1;
		const elementsArrayLengthWithoutPageTitle = elementsArray.length - 1;

		if (nextFocusableIndex > elementsArrayLengthWithoutPageTitle) {
			// create a new element

			return;
		}

		const [, { element: nextFocusableElement }] = elementsArray[nextFocusableIndex];

		nextFocusableElement.focus();
		placeCaretAtEnd(nextFocusableElement);
	}, []);

	const ctx = {
		getFocusableBlocks,
		focusableBlocks,
		focusedBlock,
		setFocusedBlock,
		clearNewElementId,
		newElementId,
		focusPreviousBlock,
		focusNextBlock,
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
