'use client';
import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';
import { DeviceType } from '@/types/shared';
import { AppStore } from '@/types/redux';

export default function StoreProvider({ children, device }: { children: ReactNode; device: DeviceType }) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore({
			ui: {
				device,
			},
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
