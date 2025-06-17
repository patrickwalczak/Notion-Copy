'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppStore } from '@/types/redux';
import { makeStore } from './index';

export default function ReduxProvider({ children }: { children: ReactNode }) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
