'use client';

import React, { useRef } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import styles from './styles.module.scss';
import { PageTitle } from '../pageTitle/PageTitle';
import { Cover } from '@/app/[id]/[pageId]/components/cover/Cover';
import EditPageName from '../../../components/editPageName/EditPageName';
import { useAppStore } from '@/lib/store/hooks';
import { initializePage } from '@/lib/store/features/page/pageSlice';

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
			<main className={styles.mainContent}>
				<Cover />
				<div className={styles.contentHeader}>
					<PageTitle />
				</div>
			</main>
		</div>
	);
};

export default PageClient;
