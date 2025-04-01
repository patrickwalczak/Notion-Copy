'use client';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './appReducer';
import { AppContextType } from './types';

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const ctxValue = { state, dispatch };

	return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
