'use client';

import React from 'react';
import { PageName } from '../pageName/PageName';
import { Cover } from '../cover/Cover';
import styles from './styles.module.scss';
import PageContent from '../pageContent/PageContent';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

const PageEditor = () => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const handleClick = () => {
		dispatch({ type: 'handleEditorFocus', payload: null });
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		// TODO handle enter
	};

	return (
		<main onKeyDown={handleKeyDown} onClick={handleClick} className={styles.mainContent}>
			<div className={`${styles.contentColumn} flex-column gap-050`}>
				<Cover />
				<div>{page ? <PageName /> : <div className={`${styles.loader} shimmerLoader`}></div>}</div>
				<PageContent />
			</div>
		</main>
	);
};

export default PageEditor;
