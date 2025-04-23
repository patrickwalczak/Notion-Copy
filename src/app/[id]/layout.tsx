import { ReactNode } from 'react';
import { DeviceType } from '@/types/shared';
import { cookies } from 'next/headers';
import AppContextProvider from '@/context/AppContext';
import NavigationController from '@/components/navigation/navigationController/NavigationController';
import AppWrapper from '@/components/appWrapper/AppWrapper';

export default async function Layout({ home, page }: { home: ReactNode; page: ReactNode }) {
	const cookieStore = await cookies();
	const device = (cookieStore.get('device')?.value as DeviceType) || 'desktop';

	return (
		<AppContextProvider device={device}>
			<AppWrapper>
				<NavigationController device={device} />
				{page}
				{home}
			</AppWrapper>
		</AppContextProvider>
	);
}
