import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './features/ui/uiSlice';
import pagesReducer from './features/pages/pagesSlice';
import pageReducer from './features/page/pageSlice';

export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
	ui: uiReducer,
	pages: pagesReducer,
	page: pageReducer,
});

export const makeStore = (preloadedState: PreloadedStateType) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
