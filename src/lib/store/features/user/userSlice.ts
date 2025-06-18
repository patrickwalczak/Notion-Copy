import { DeviceType } from '@/types/shared';
import { ThemeModeType } from '@/types/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	username: '',
	userId: '',
	email: '',
	device: 'desktop',
	userPreferences: {
		isNavigationOpen: false,
		isNavigationLocked: false,
		theme: 'dark',
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleNavigation: (state, action) => {
			state.userPreferences.isNavigationOpen = action.payload.isOpen ?? state.userPreferences.isNavigationOpen;
			state.userPreferences.isNavigationLocked = action.payload.isLocked ?? state.userPreferences.isNavigationLocked;
		},
		changeDevice: (state, action) => {
			state.device = action.payload;
		},
		changeTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { toggleNavigation, changeDevice, changeTheme } = userSlice.actions;
export default userSlice.reducer;
