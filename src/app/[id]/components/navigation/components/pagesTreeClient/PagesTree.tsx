'use client';

import { initializePages } from '@/lib/store/features/pages/pagesSlice';
import { useAppStore } from '@/lib/store/hooks';
import React, { useRef } from 'react';
import PageGroup from '../pageGroup/PageGroup';

const PagesTreeClient = ({ pages }: { pages: any }) => {
	const store = useAppStore();
	const initialized = useRef(false);

	if (!initialized.current) {
		store.dispatch(initializePages(pages));
		initialized.current = true;
	}

	return (
		<div role="tree" className={`flex-column gap-1`}>
			<div className={`flex-column gap-025`}>
				{pages.map((page) => (
					<PageGroup key={page.id} page={page} />
				))}
			</div>
		</div>
	);
};

export default PagesTreeClient;
