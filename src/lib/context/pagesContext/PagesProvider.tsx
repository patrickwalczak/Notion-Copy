'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { PagesContextType } from './types';
import { PageEntityType } from '@/types/page';

export const PagesContext = createContext<PagesContextType | null>(null);

const PagesProvider = ({ children, pages }: { children: React.ReactNode; pages: PageEntityType[] }) => {
	const [state, dispatch] = useReducer(reducer, {
		pages,
		page: null,
	});

	const value = { state, dispatch };

	return <PagesContext value={value}>{children}</PagesContext>;
};

export default PagesProvider;
