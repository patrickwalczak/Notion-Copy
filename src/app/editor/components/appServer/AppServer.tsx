import React from 'react';
import AppClient from '../appClient/AppClient';
import NavigationController from '../navigation/NavigationController';
import { getDevice } from '@/lib/actions/cookies';
import { createClient } from '@/lib/db/supabase/server';
import { redirect } from 'next/navigation';
import Providers from '@/app/editor/providers/Providers';
import { getPages } from '@/lib/actions/pages/getPages';
import { getNavigationCookies } from '@/lib/actions/navigationCookies';

const AppServer = async ({ children }: { children: React.ReactNode }) => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const [device, userPreferences, pages] = await Promise.all([getDevice(), getNavigationCookies(), getPages()]);

	return (
		<Providers device={device} userPreferences={userPreferences} pages={pages} userEmail={user.email!}>
			<AppClient>
				<NavigationController />
				{children}
			</AppClient>
		</Providers>
	);
};

export default AppServer;
