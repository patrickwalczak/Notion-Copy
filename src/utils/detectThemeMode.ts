import { ThemeModeType } from '@/types/themeMode';

export const detectThemeMode = (): ThemeModeType => {
	if (typeof window !== 'undefined')
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	return 'light';
};
