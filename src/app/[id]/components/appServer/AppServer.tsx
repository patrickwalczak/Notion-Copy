import React from 'react';
import AppClient from '../appClient/AppClient';
import NavigationController from '../navigation/NavigationController';
import { getDevice } from '@/actions/cookies';
import { createClient } from '@/lib/db/supabase/server';
import { redirect } from 'next/navigation';
import Providers from '@/lib/context/Providers';
import { PageElementSimpleType } from '@/types/page';
import { getPagesRequest } from '@/lib/api/page';
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
	const device = await getDevice();
	const userPreferences = await getUserPreferences();
	const pages = await getPages();

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	return (
		<Providers device={device} userPreferences={userPreferences} pages={pages as PageElementSimpleType[]} user={user}>
			<AppClient>
				<NavigationController />
				{children}
			</AppClient>
		</Providers>
	);
};

export default AppServer;
