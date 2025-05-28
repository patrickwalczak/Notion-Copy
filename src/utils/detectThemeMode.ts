import { ThemeModeType } from '@/types/shared';

export const detectThemeMode = (): ThemeModeType => {
	if (typeof window !== 'undefined')
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	return 'light';
};
