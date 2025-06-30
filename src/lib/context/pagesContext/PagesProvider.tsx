'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { PagesContextType } from './types';

export const PagesContext = createContext<PagesContextType | null>(null);

const PagesProvider = ({ children, pages }) => {
	const [state, dispatch] = useReducer(reducer, {
		pages,
		page: null,
		focusedElementId: null,
	});

	const value = { state, dispatch };

	return <PagesContext value={value}>{children}</PagesContext>;
};

export default PagesProvider;
