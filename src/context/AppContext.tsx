'use client';
import { createContext, useReducer } from 'react';
import { reducer, createInitialState } from './appReducer';
import { AppContextType } from './types';
import { useThemeMode } from '@/hooks/useThemeMode';
import { DeviceType } from '@/types/shared';
import { useResizeEvent } from '@/hooks/useResizeEvent';

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children, device }: { children: React.ReactNode; device: DeviceType }) => {
	const [state, dispatch] = useReducer(reducer, undefined, () => createInitialState(device));
	useThemeMode(dispatch);
	useResizeEvent(dispatch, state.device);

	const ctxValue = { state, dispatch };

	return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
