'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store/index';
import { DeviceType } from '@/types/shared';
import { AppStore } from '@/types/redux';

export default function StoreProvider({
	children,
	device,
	pages,
}: {
	children: ReactNode;
	device: DeviceType;
	pages: any;
}) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore({
			ui: {
				device,
				isNavigationOpen: true,
				isNavigationLocked: true,
			},
			pages: {
				pages,
			},
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
