import { Dispatch, useEffect } from 'react';
import { ActionsEnum, ActionsType } from '@/context/types';

export const useThemeMode = (dispatch: Dispatch<ActionsType>) => {
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const updateTheme = (e: MediaQueryListEvent) => {
			dispatch({ type: ActionsEnum.CHANGE_MODE, payload: e.matches ? 'dark' : 'light' });
		};

		mediaQuery.addEventListener('change', updateTheme);
		return () => mediaQuery.removeEventListener('change', updateTheme);
	}, []);
};
