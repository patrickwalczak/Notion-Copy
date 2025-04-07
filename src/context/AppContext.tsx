'use client';
import { createContext, useReducer } from 'react';
import { reducer, createInitialState } from './appReducer';
import { AppContextType } from './types';
import { useThemeMode } from '@/hooks/useThemeMode';

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
	useThemeMode(dispatch);

	const ctxValue = { state, dispatch };

	return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
