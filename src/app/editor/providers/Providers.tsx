import React from 'react';
import UserProvider from './userProvider/UserProvider';
import PagesProvider from './pagesProvider/PagesProvider';
import { PageModelType } from '@/types/page';
import { DeviceType } from '@/types/shared';

const Providers = ({
	children,
	device,
	userPreferences,
	pages,
	userEmail,
}: {
	pages: PageModelType[];
	children: React.ReactNode;
	device: DeviceType;
	userPreferences: {
		isNavigationOpen: boolean;
		isNavigationLocked: boolean;
	};
	userEmail: string;
}) => {
	return (
		<UserProvider device={device} userPreferences={userPreferences} userEmail={userEmail}>
			<PagesProvider pages={pages}>{children}</PagesProvider>
		</UserProvider>
	);
};

export default Providers;
