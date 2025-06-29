'use client';

import React from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import EditPageName from '../../../components/editPageName/EditPageName';
import PageEditor from '../pageEditor/PageEditor';
import PageProvider from '../../store/PageProvider';

const PageClient = ({ pageData }) => {
	return (
		<PageProvider initialData={pageData}>
			<div className={`flex-grow-1`}>
				<PageHeader>
					<EditPageName />
				</PageHeader>
				<PageEditor />
			</div>
		</PageProvider>
	);
};

export default PageClient;
