import { useEffect } from 'react';
import { useSafeContext } from './useSafeContext';
import { UserContext } from '../../app/editor/providers/userProvider/UserProvider';

export const useThemeMode = () => {
	const { dispatch } = useSafeContext(UserContext);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const updateTheme = (e: MediaQueryListEvent) => {
			dispatch({ type: 'changeTheme', payload: e.matches ? 'dark' : 'light' });
		};

		dispatch({
			type: 'changeTheme',
			payload: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
		});

		mediaQuery.addEventListener('change', updateTheme);

		return () => mediaQuery.removeEventListener('change', updateTheme);
	}, []);
};
