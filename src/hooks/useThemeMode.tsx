import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { changeTheme } from '../lib/features/ui/uiSlice';

export const useThemeMode = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const updateTheme = (e: MediaQueryListEvent) => {
			dispatch(changeTheme(e.matches ? 'dark' : 'light'));
		};

		dispatch(changeTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

		mediaQuery.addEventListener('change', updateTheme);

		return () => mediaQuery.removeEventListener('change', updateTheme);
	}, [dispatch]);
};
