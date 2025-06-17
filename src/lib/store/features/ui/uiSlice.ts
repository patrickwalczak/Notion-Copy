import { DeviceType } from '@/types/shared';
import { ThemeModeType } from '@/types/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiStateType = {
	isNavigationOpen: boolean;
	isNavigationLocked: boolean;
	device: DeviceType;
	theme: ThemeModeType;
};

const initialState: UiStateType = {
	isNavigationOpen: true,
	isNavigationLocked: true,
	device: 'desktop',
	theme: 'light',
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleNavigation: (state, action: PayloadAction<{ isOpen?: boolean; isLocked?: boolean }>) => {
			state.isNavigationOpen = action.payload.isOpen ?? state.isNavigationOpen;
			state.isNavigationLocked = action.payload.isLocked ?? state.isNavigationLocked;
		},
		changeDevice: (state, action: PayloadAction<UiStateType['device']>) => {
			state.device = action.payload;
		},
		changeTheme: (state, action: PayloadAction<UiStateType['theme']>) => {
			state.theme = action.payload;
		},
	},
});

export const { toggleNavigation, changeDevice, changeTheme } = uiSlice.actions;
export default uiSlice.reducer;
