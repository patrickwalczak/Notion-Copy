import React, { useState } from 'react';
import EditPageTittleBtn from './EditPageTittleBtn';
import styles from './styles.module.scss';
import EditPagePopup from './EditPagePopup';
import { PageContext } from '@/app/[id]/@page/context/PageContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const EditPageTitle = () => {
	const { state, dispatch } = useSafeContext(PageContext);
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => setIsOpen((prevState) => !prevState);

	const closePopup = () => setIsOpen(false);

	const containerRef = useOutsideClick(closePopup, isOpen);

	return (
		<div className={styles.container} ref={containerRef}>
			<EditPageTittleBtn pageTitle={state.title} clickHandler={togglePopup} ariaLabel="Edit page title" />
			{isOpen && <EditPagePopup togglePopup={togglePopup} />}
		</div>
	);
};

export default EditPageTitle;
