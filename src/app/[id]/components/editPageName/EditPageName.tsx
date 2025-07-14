'use client';

import React from 'react';
import EditPageNameBtn from './EditPageNameBtn';
import styles from './styles.module.scss';
import EditPagePopup from './EditPagePopup';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

const EditPageName = () => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const { isOpen, toggle, close } = useIsOpenState();
	const containerRef = useOutsideClick(close, isOpen);

	const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		const newValue = e.target.innerText.trim();

		dispatch({ type: 'renamePage', payload: { newName: newValue, pageId: page?.id || '' } });
	};

	if (!page) return <div className={`${styles.loader} shimmerLoader`} />;

	return (
		<div className={styles.container} ref={containerRef}>
			<EditPageNameBtn pageName={page?.properties?.name as string} clickHandler={toggle} />
			{isOpen && (
				<EditPagePopup handleInput={handleInput} pageName={page.properties.name} isOpen={isOpen} togglePopup={toggle} />
			)}
		</div>
	);
};

export default EditPageName;
