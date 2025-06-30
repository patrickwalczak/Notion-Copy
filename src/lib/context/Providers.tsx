import React from 'react';
import UserProvider from './userContext/UserProvider';
import PagesProvider from './pagesContext/PagesProvider';

const Providers = ({ children, device, userPreferences, pages, user }) => {
	return (
		<UserProvider device={device} userPreferences={userPreferences} user={user}>
			<PagesProvider pages={pages}>{children}</PagesProvider>
		</UserProvider>
	);
};

export default Providers;
