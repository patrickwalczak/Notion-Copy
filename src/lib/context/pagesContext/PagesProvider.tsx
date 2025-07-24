'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { PagesContextType } from './types';
import { PageEntityType } from '@/types/page';

export const PagesContext = createContext<PagesContextType | null>(null);

function buildPageTree(pages: PageEntityType[]): PageEntityType[] {
	const pageMap = new Map<string, PageEntityType>();
	const rootPages: PageEntityType[] = [];

	for (const page of pages) {
		page.subpages = [];
		pageMap.set(page.id, page);
	}

	for (const page of pages) {
		if (page.parentId) {
			const parent = pageMap.get(page.parentId);
			if (parent) {
				parent.subpages.push(page);
			}
		} else {
			rootPages.push(page);
		}
	}

	return rootPages;
}

const PagesProvider = ({ children, pages }: { children: React.ReactNode; pages: PageEntityType[] }) => {
	const [state, dispatch] = useReducer(reducer, {
		pages: buildPageTree(pages),
		page: null,
		removedPage: null,
	});

	const value = { state, dispatch };

	return <PagesContext value={value}>{children}</PagesContext>;
};

export default PagesProvider;
