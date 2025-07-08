'use client';

import React, { createContext, RefObject, useCallback, useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PageFullEntityType } from '@/types/page';
import usePageSetter from './usePageSetter';

export interface PageContextType {
	getElementsMapRef: () => Map<string, { type: string; element: HTMLDivElement }>;
	elementsMapRef: RefObject<Map<string, { type: string; element: HTMLDivElement }> | null>;
	focusedElement: RefObject<Element | null>;
	focusedElementId: RefObject<string | null>;
}

export const PageContext = createContext<PageContextType | null>(null);

const PageClient = ({ pageData }: { pageData: PageFullEntityType }) => {
	const elementsMapRef = useRef<Map<string, { type: string; element: HTMLDivElement }> | null>(null);
	const focusedElement = useRef<Element | null>(null);
	const focusedElementId = useRef<string | null>(null);

	usePageSetter(pageData);

	const getElementsMapRef = useCallback(() => {
		if (!elementsMapRef.current) {
			elementsMapRef.current = new Map();
		}

		return elementsMapRef.current;
	}, []);

	const ctx = {
		getElementsMapRef,
		elementsMapRef,
		focusedElement,
		focusedElementId,
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
