import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './features/ui/uiSlice';
import pagesReducer from './features/pages/pagesSlice';

export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
	ui: uiReducer,
	pages: pagesReducer,
});

export const makeStore = (preloadedState: PreloadedStateType) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
