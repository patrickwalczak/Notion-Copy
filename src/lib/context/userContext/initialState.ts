import { UserStateType } from './types';

export const initialState: UserStateType = {
	email: '',
	device: 'desktop',
	userPreferences: {
		isNavigationOpen: false,
		isNavigationLocked: false,
		theme: 'dark',
	},
};
