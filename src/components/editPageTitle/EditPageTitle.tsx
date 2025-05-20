import React, { useState } from 'react';
import EditPageTittleBtn from './EditPageTittleBtn';
import styles from './styles.module.scss';
import EditPagePopup from './EditPagePopup';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const EditPageTitle = () => {
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => setIsOpen((prevState) => !prevState);

	const closePopup = () => setIsOpen(false);

	const containerRef = useOutsideClick(closePopup, isOpen);

	return (
		<div className={styles.container} ref={containerRef}>
			<EditPageTittleBtn pageTitle={'Page Title'} clickHandler={togglePopup} ariaLabel="Edit page title" />
			{isOpen && <EditPagePopup isOpen={isOpen} togglePopup={togglePopup} />}
		</div>
	);
};

export default EditPageTitle;
