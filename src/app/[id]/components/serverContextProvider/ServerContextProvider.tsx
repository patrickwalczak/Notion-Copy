import StoreProvider from '@/app/StoreProvider';
import { getPages } from '@/dummy';
import React from 'react';
import AppClient from '../appClient/AppClient';
import NavigationController from '../navigation/navigationController/NavigationController';

const ServerContextProvider = async ({ children }: { children: React.ReactNode }) => {
	const pages = await getPages();

	return (
		<StoreProvider pages={pages}>
			<AppClient>
				<NavigationController />
				{children}
			</AppClient>
		</StoreProvider>
	);
};

export default ServerContextProvider;
