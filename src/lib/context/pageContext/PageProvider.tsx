'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { PageContextType } from './types';

export const PageContext = createContext<PageContextType | null>(null);

const PageProvider = ({ children, pages }) => {
	const [state, dispatch] = useReducer(reducer, {
		pages,
		page: null,
		focusedElementId: null,
	});

	const value = { state, dispatch };

	return <PageContext value={value}>{children}</PageContext>;
};

export default PageProvider;
