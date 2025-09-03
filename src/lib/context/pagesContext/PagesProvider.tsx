'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { PagesContextType } from './types';
import { PageModelType } from '@/types/page';
import { buildPageTree } from '@/lib/utils/buildPageTree';

export const PagesContext = createContext<PagesContextType | null>(null);

const PagesProvider = ({ children, pages }: { children: React.ReactNode; pages: PageModelType[] }) => {
	const [state, dispatch] = useReducer(reducer, {
		pages: buildPageTree(pages),
		page: null,
		removedPage: null,
	});

	const value = { state, dispatch };

	return <PagesContext value={value}>{children}</PagesContext>;
};

export default PagesProvider;
