import React from 'react';
import styles from './styles.module.scss';

const EditPagePopup = () => {
	return (
		<div role="dialog" aria-modal="true" className={styles.popup}>
			<button className={styles.button}>Icon</button>
			<div
				className={styles.input}
				spellCheck="true"
				contentEditable="true"
				tabIndex={0}
				role="textbox"
				aria-label="Start typing to edit text"
			/>
		</div>
	);
};

export default EditPagePopup;
