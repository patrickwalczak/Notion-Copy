'use client';

import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { UserContextType } from './types';
import { DeviceType } from '@/types/shared';

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({
	children,
	device,
	userPreferences,
	userEmail,
}: {
	children: React.ReactNode;
	device: DeviceType;
	userPreferences: {
		isNavigationOpen: boolean;
		isNavigationLocked: boolean;
	};
	userEmail: string;
}) => {
	const [state, dispatch] = useReducer(reducer, {
		email: userEmail,
		device: device,
		userPreferences: {
			...userPreferences,
			theme: 'dark',
		},
	});

	const value = { state, dispatch };

	return <UserContext value={value}>{children}</UserContext>;
};

export default UserProvider;
