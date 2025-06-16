'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store/index';
import { AppStore } from '@/types/redux';

export default function StoreProvider({ children, pages }: { children: ReactNode; pages: any }) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore({
			pages: {
				pages,
			},
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
