import ReduxProvider from '@/lib/store/ReduxProvider';
import React from 'react';
import AppClient from '../appClient/AppClient';
import NavigationController from '../navigation/navigationController/NavigationController';
import { getDevice } from '@/actions/cookies';
import { createClient } from '@/lib/db/supabase/server';
import { redirect } from 'next/navigation';

async function getUserPreferences() {
	'use server';
	const preferences = {
		isNavigationOpen: true,
		isNavigationLocked: true,
		theme: 'dark',
	};

	return new Promise((resolve) => setTimeout(() => resolve(preferences), 75)).then((value) => value);
}

const AppServer = async ({ children }: { children: React.ReactNode }) => {
	const device = await getDevice();
	const userPreferences = await getUserPreferences();
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	return (
		<ReduxProvider
			sliceData={{
				username: 'Patrick',
				userId: user.id,
				email: user.email,
				device,
				userPreferences,
			}}
		>
			<AppClient>
				<NavigationController device={device} />
				{children}
			</AppClient>
		</ReduxProvider>
	);
};

export default AppServer;
