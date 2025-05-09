import React, { useState } from 'react';
import EditPageTittleBtn from './EditPageTittleBtn';
import styles from './styles.module.scss';
import EditPagePopup from './EditPagePopup';

const EditPageTitle = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.container}>
			<EditPageTittleBtn pageTitle="Page title" clickHandler={() => setIsOpen(!isOpen)} ariaLabel="Edit page title" />
			{isOpen && <EditPagePopup />}
		</div>
	);
};

export default EditPageTitle;
