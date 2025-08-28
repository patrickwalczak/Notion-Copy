import { DeviceType } from '@/types/shared';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getDevice = cache(async (): Promise<DeviceType> => {
	const cookieStore = await cookies();
	const device = (cookieStore.get('device')?.value as DeviceType) || 'desktop';

	return device;
});
