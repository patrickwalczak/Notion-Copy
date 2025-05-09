'use client';

import React from 'react';
import PageHeader from '@/components/pageHeader/PageHeader';
import styles from './styles.module.scss';
import EditPageTittleBtn from '@/components/editPageTitle/EditPageTittleBtn';
import { useSafeContext } from '@/hooks/useSafeContext';
import { PageContext } from '../../context/PageContext';
import EditPageTitle from '@/components/editPageTitle/EditPageTitle';

const PageClient = ({ pageId }: { pageId: string }) => {
	const { state, dispatch } = useSafeContext(PageContext);

	return (
		<div className={styles.viewContainer}>
			<PageHeader>
				<EditPageTitle />
			</PageHeader>
		</div>
	);
};

export default PageClient;
