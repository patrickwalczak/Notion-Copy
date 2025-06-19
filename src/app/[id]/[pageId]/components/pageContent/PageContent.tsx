'use client';

import React from 'react';
import styles from './styles.module.scss';
import ElementBox from '../elementBox/ElementBox';
import { useAppSelector } from '@/lib/store/hooks';

const PageContent = () => {
	const { page } = useAppSelector((state) => state.page);

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			{page.elements.map((element) => (
				<ElementBox element={element} key={element.id} />
			))}
		</div>
	);
};

export default PageContent;
