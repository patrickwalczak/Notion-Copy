'use client';

import React from 'react';
import EditPageNameBtn from './EditPageNameBtn';
import styles from './styles.module.scss';
import EditPagePopup from './EditPagePopup';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useAppSelector } from '@/lib/hooks';
import useIsOpenState from '@/hooks/useIsOpenState';

const EditPageTitle = () => {
	const { page } = useAppSelector((state) => state.page);
	const { isOpen, toggle, close } = useIsOpenState();
	const containerRef = useOutsideClick(close, isOpen);

	return (
		<div className={styles.container} ref={containerRef}>
			<EditPageNameBtn pageName={page?.name} clickHandler={toggle} />
			{isOpen && <EditPagePopup isOpen={isOpen} togglePopup={toggle} />}
		</div>
	);
};

export default EditPageTitle;
