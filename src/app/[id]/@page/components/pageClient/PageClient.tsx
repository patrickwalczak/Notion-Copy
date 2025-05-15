'use client';

import React from 'react';
import PageHeader from '@/components/pageHeader/PageHeader';
import styles from './styles.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { PageContext } from '../../context/PageContext';
import { PageTitle } from '../pageTitle/PageTitle';
import { Cover } from '@/app/[id]/@page/components/cover/Cover';
import EditPageTitle from '../editPageTitle/EditPageTitle';
import { IconManager } from '@/components/iconManager/EmojiPickerClient';

const PageClient = ({ pageId }: { pageId: string }) => {
	const { state, dispatch } = useSafeContext(PageContext);

	return (
		<div className={styles.viewContainer}>
			<PageHeader>
				<IconManager />
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
