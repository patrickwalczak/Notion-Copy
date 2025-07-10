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

export interface PageContextType {
	getElementsMapRef: () => Map<string, { type: string; element: HTMLDivElement }>;
	elementsMapRef: RefObject<Map<string, { type: string; element: HTMLDivElement }> | null>;
	setFocusedElement: (element: Element | null, id: string | null) => void;
	focusedElement: RefObject<Element | null>;
	focusedElementId: RefObject<string | null>;
	clearNewElementId: () => void;
	newElementId: RefObject<string>;
	focusPreviousElement: (id: string) => void;
	focusNextElement: (id: string) => void;
}

export const PageContext = createContext<PageContextType | null>(null);

const PageClient = ({ pageData }: { pageData: PageFullEntityType }) => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	const elementsMapRef = useRef<Map<string, { type: string; element: HTMLDivElement }> | null>(null);
	const focusedElement = useRef<Element | null>(null);
	const focusedElementId = useRef<string | null>(null);
	const newElementId = useRef<string>('');

	usePageSetter(pageData);

	const getElementsMapRef = useCallback(() => {
		if (!elementsMapRef.current) {
			elementsMapRef.current = new Map();
		}

		return elementsMapRef.current;
	}, []);

	const setFocusedElement = (element: Element | null, id: string | null) => {
		focusedElement.current = element;
		focusedElementId.current = id;
	};

	const clearNewElementId = () => {
		newElementId.current = '';
	};

	const focusPreviousElement = useCallback(
		(id: string) => {
			if (!page?.elements || !elementsMapRef.current) return;

			const elIndex = page.elements.findIndex((element) => element.id === id);

			if (elIndex === -1 || elIndex === 0) return;

			const previousElementId = page.elements[elIndex - 1].id;

			const previousElement = elementsMapRef.current.get(previousElementId);

			if (!previousElement) return;

			previousElement.element.focus();
			placeCaretAtEnd(previousElement.element);
		},
		[page?.elements]
	);

	const focusNextElement = useCallback(
		(id: string) => {
			if (!page?.elements || !elementsMapRef.current) return;

			const elIndex = page.elements.findIndex((element) => element.id === id);

			if (elIndex === -1 || elIndex === page.elements.length - 1) return;

			const nextElementId = page.elements[elIndex + 1].id;

			const nextElement = elementsMapRef.current.get(nextElementId);

			if (!nextElement) return;

			nextElement.element.focus();
			placeCaretAtEnd(nextElement.element);
		},
		[page?.elements]
	);

	const ctx = {
		getElementsMapRef,
		elementsMapRef,
		focusedElement,
		focusedElementId,
		setFocusedElement,
		clearNewElementId,
		newElementId,
		focusPreviousElement,
		focusNextElement,
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
