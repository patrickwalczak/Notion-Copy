'use client';

import React from 'react';
import EditPageNameBtn from './EditPageNameBtn';
import styles from './styles.module.scss';
import EditPagePopup from './EditPagePopup';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/app/editor/providers/pagesProvider/PagesProvider';

const EditPageName = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	const { isOpen, toggle, close } = useIsOpenState();
	const containerRef = useOutsideClick(close, isOpen);

	if (!page) return <div className={`${styles.loader} skeleton-loader`} />;

	return (
		<div className={styles.container} ref={containerRef}>
			<EditPageNameBtn pageName={page.properties.name} clickHandler={toggle} />
			{isOpen && (
				<EditPagePopup pageName={page.properties.name} pageId={page.id} isOpen={isOpen} togglePopup={toggle} />
			)}
		</div>
	);
};

export default EditPageName;
