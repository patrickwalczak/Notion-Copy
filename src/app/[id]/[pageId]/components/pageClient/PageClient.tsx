'use client';

import React, { useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import { useAppStore } from '@/lib/store/hooks';
import { initializePage } from '@/lib/store/features/page/pageSlice';
import PageEditor from '../pageEditor/PageEditor';

const PageClient = ({ pageData }) => {
	const store = useAppStore();
	const initialized = useRef(false);

	if (!initialized.current) {
		store.dispatch(initializePage(pageData));
		initialized.current = true;
	}

	return (
		<div className={`flex-grow-1`}>
			<PageHeader>
				<EditPageName />
			</PageHeader>
			<PageEditor />
		</div>
	);
};

export default PageClient;
