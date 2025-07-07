'use client';

import React, { useEffect } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageElementType } from '@/types/page';

const PageClient = ({ pageData }: { pageData: PageElementType }) => {
	const { dispatch } = useSafeContext(PagesContext);
	console.log(pageData);

	// TODO Improve it
	useEffect(() => {
		dispatch({ type: 'setPage', payload: pageData });

		return () => dispatch({ type: 'setPage', payload: null });
	}, [dispatch, pageData]);

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
