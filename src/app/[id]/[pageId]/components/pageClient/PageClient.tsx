'use client';

import React, { useEffect } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const PageClient = ({ pageData }) => {
	const { dispatch, state } = useSafeContext(PagesContext);

	useEffect(() => {
		dispatch({ type: 'setPage', payload: pageData });

		return () => dispatch({ type: 'setPage', payload: null });
	}, []);

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
