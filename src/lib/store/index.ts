import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import pagesReducer from './features/pages/pagesSlice';

export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
	user: userReducer,
	pages: pagesReducer,
});

export const makeStore = (preloadedState: PreloadedStateType) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
