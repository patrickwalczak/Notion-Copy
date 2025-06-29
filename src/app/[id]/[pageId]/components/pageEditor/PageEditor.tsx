'use client';

import React from 'react';
import { PageTitle } from '../pageTitle/PageTitle';
import { Cover } from '../cover/Cover';
import styles from './styles.module.scss';
import PageContent from '../pageContent/PageContent';
import { PageContext } from '../../store/PageProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const PageEditor = () => {
	const ctx = useSafeContext(PageContext);

	console.log(ctx);

	return (
		<main className={styles.mainContent}>
			<div className={`${styles.contentColumn} flex-column gap-050`}>
				<Cover />
				<div>
					<PageTitle />
				</div>
				<PageContent />
			</div>
		</main>
	);
};

export default PageEditor;
