import { ThemeMode } from '@/types/themeMode';

export const detectThemeMode = (): ThemeMode => {
	if (typeof window !== 'undefined')
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	return 'light';
};
