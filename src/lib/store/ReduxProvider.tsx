'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppStore } from '@/types/redux';
import { makeStore } from './index';

export default function ReduxProvider({
	children,
	useSliceData,
	pagesSlice,
}: {
	children: ReactNode;
	useSliceData: any;
	pagesSlice: any;
}) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore({
			user: useSliceData,
			pages: {
				pages: pagesSlice,
			},
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
