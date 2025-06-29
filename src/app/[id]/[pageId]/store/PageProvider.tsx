import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { PageContextType } from './types';

export const PageContext = createContext<PageContextType | null>(null);

const PageProvider = ({ children, initialData }: { children: React.ReactNode; initialData: any }) => {
	const [state, dispatch] = useReducer(reducer, { page: initialData, focusedElementId: null });

	const value = { state, dispatch };

	return <PageContext value={value}>{children}</PageContext>;
};

export default PageProvider;
