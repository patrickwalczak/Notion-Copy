'use client';

import React from 'react';
import { PageTitle } from '../pageTitle/PageTitle';
import { Cover } from '../cover/Cover';
import styles from './styles.module.scss';
import PageContent from '../pageContent/PageContent';
import { useAppDispatch } from '@/lib/store/hooks';
import { handleEditorFocus } from '@/lib/store/features/page/pageSlice';

const PageEditor = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(handleEditorFocus());
	};

	return (
		<main onClick={handleClick} className={styles.mainContent}>
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
