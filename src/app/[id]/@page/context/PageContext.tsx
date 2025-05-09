'use client';
import { createContext, useReducer } from 'react';
import { PageContextType } from './types';
import { reducer, initialState } from './pageReducer';

export const PageContext = createContext<PageContextType | null>(null);

const PageContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const ctxValue = { state, dispatch };

	return <PageContext.Provider value={ctxValue}>{children}</PageContext.Provider>;
};

export default PageContextProvider;
