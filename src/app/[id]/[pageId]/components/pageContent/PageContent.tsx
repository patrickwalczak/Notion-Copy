'use client';

import React from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import BlockElement from '../blockElement/ElementBox';

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	// TODO: Add loading state
	if (!page) return null;

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			{page.blocks.map((block) => (
				<BlockElement element={block} key={block.id} />
			))}
		</div>
	);
};

export default PageContent;
