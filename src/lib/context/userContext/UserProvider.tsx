'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { UserContextType } from './types';

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children, device, userPreferences, user }) => {
	const [state, dispatch] = useReducer(reducer, {
		username: 'Patrick',
		userId: user.id,
		email: user.email,
		device: device,
		userPreferences: userPreferences,
	});

	const value = { state, dispatch };

	return <UserContext value={value}>{children}</UserContext>;
};

export default UserProvider;
