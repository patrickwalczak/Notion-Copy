import { ReactNode, use } from 'react';
import { DeviceType } from '@/types/shared';
import { cookies } from 'next/headers';
import NavigationController from '@/components/navigation/navigationController/NavigationController';
import AppClient from '@/components/appClient/AppClient';
import StoreProvider from '../StoreProvider';
import { getPages } from '@/dummy';
import '../../styles/app_variables.scss';

export default function Layout({ home, page }: { home: ReactNode; page: ReactNode }) {
	const cookieStore = use(cookies());
	const device = (cookieStore.get('device')?.value as DeviceType) || 'desktop';

	const pages = use(getPages());

	return (
		<StoreProvider device={device} pages={pages}>
			<AppClient>
				<NavigationController device={device} />
				{page}
				{home}
			</AppClient>
		</StoreProvider>
	);
}
