import React from 'react';
import AppClient from '../appClient/AppClient';
import NavigationController from '../navigation/NavigationController';
import { getDevice } from '@/actions/cookies';
import { createClient } from '@/lib/db/supabase/server';
import { redirect } from 'next/navigation';
import Providers from '@/lib/context/Providers';
import { PageEntityType } from '@/types/page';
import { getPages } from '@/lib/actions/pages/getPages';

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
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const [device, userPreferences, pages] = await Promise.all([getDevice(), getUserPreferences(), getPages()]);

	return (
		<Providers device={device} userPreferences={userPreferences} pages={pages as PageEntityType[]} user={user}>
			<AppClient>
				<NavigationController />
				{children}
			</AppClient>
		</Providers>
	);
};

export default AppServer;
