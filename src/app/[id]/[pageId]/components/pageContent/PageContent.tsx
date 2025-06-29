'use client';

import React from 'react';
import styles from './styles.module.scss';
import ElementBox from '../elementBox/ElementBox';
import { PageContext } from '../../store/PageProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PageContext);

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			{page.elements.map((element) => (
				<ElementBox element={element} key={element.id} />
			))}
		</div>
	);
};

export default PageContent;
