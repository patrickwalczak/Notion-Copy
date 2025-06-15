import './index.scss';
import { ReactNode, Suspense } from 'react';
import { DeviceType } from '@/types/shared';
import { cookies } from 'next/headers';
import NavigationController from '@/app/[id]/components/navigation/navigationController/NavigationController';
import AppClient from '@/app/[id]/components/appClient/AppClient';
import StoreProvider from '../StoreProvider';
import { getPages } from '@/dummy';

export default async function Layout({ home, page }: { home: ReactNode; page: ReactNode }) {
	const cookieStore = await cookies();
	const device = (cookieStore.get('device')?.value as DeviceType) || 'desktop';

	const pages = await getPages();

	return (
		<Suspense fallback={<div>loading</div>}>
			<StoreProvider device={device} pages={pages}>
				<AppClient>
					<NavigationController device={device} />
					{page}
					{home}
				</AppClient>
			</StoreProvider>
		</Suspense>
	);
}
