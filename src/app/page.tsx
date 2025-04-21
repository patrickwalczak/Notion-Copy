import { cookies } from 'next/headers';
import AppContextProvider from '@/context/AppContext';
import { DeviceType } from '@/types/shared';

export default async function Page() {
	const cookieStore = await cookies();
	const device = (cookieStore.get('device')?.value as DeviceType) || 'desktop';

	return (
		<AppContextProvider device={device}>
			<div></div>
		</AppContextProvider>
	);
}
