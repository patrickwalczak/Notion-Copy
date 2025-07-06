import React from 'react';
import UserProvider from './userContext/UserProvider';
import PagesProvider from './pagesContext/PagesProvider';
import { PageElementSimpleType } from '@/types/page';

const Providers = ({
	children,
	device,
	userPreferences,
	pages,
	user,
}: {
	pages: PageElementSimpleType[];
	children: React.ReactNode;
	device: any;
	userPreferences: any;
	user: any;
}) => {
	return (
		<UserProvider device={device} userPreferences={userPreferences} user={user}>
			<PagesProvider pages={pages}>{children}</PagesProvider>
		</UserProvider>
	);
};

export default Providers;
