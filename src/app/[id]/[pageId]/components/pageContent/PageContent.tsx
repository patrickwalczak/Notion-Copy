'use client';

import React from 'react';
import styles from './styles.module.scss';
import ElementBox from '../elementBox/ElementBox';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	// TODO: Add loading state
	if (!page) return null;

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			{page.elements.map((element) => (
				<ElementBox element={element} key={element.id} />
			))}
		</div>
	);
};

export default PageContent;
