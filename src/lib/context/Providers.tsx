import React from 'react';
import UserProvider from './userContext/UserProvider';
import PagesProvider from './pagesContext/PagesProvider';
import { PageEntityType } from '@/types/page';
import { DeviceType } from '@/types/shared';

const Providers = ({
	children,
	device,
	userPreferences,
	pages,
	user,
}: {
	pages: PageEntityType[];
	children: React.ReactNode;
	device: DeviceType;
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
