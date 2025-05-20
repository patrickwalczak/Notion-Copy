import { ReactNode } from 'react';
import { DeviceType } from '@/types/shared';
import { cookies } from 'next/headers';
import NavigationController from '@/components/navigation/navigationController/NavigationController';
import AppClient from '@/components/appClient/AppClient';
import StoreProvider from '../StoreProvider';

export default async function Layout({ home, page }: { home: ReactNode; page: ReactNode }) {
	const cookieStore = await cookies();
	const device = (cookieStore.get('device')?.value as DeviceType) || 'desktop';

	return (
		<StoreProvider device={device}>
			<AppClient>
				<NavigationController device={device} />
				{page}
				{home}
			</AppClient>
		</StoreProvider>
	);
}
