import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import pagesReducer from './features/pages/pagesSlice';
import pageReducer from './features/page/pageSlice';

export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
	user: userReducer,
	pages: pagesReducer,
	page: pageReducer,
});

export const makeStore = (preloadedState: PreloadedStateType) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
