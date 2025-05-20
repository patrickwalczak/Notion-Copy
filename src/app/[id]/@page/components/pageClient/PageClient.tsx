'use client';

import React from 'react';
import PageHeader from '@/components/pageHeader/PageHeader';
import styles from './styles.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { PageTitle } from '../pageTitle/PageTitle';
import { Cover } from '@/app/[id]/@page/components/cover/Cover';
import EditPageTitle from '../../../../../components/editPageTitle/EditPageTitle';

const PageClient = ({ pageId }: { pageId: string }) => {
	return (
		<div className={`flex-grow-1`}>
			<PageHeader>
				<EditPageTitle />
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
