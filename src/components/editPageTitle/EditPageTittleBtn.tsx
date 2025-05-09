'use client';
import React from 'react';
import styles from './styles.module.scss';

const EditPageTittleBtn = ({
	pageTitle,
	clickHandler,
	ariaLabel,
}: {
	pageTitle: string;
	clickHandler: () => void;
	ariaLabel: string;
}) => {
	return (
		<button aria-label={ariaLabel} onClick={clickHandler} className={styles.button}>
			{pageTitle}
		</button>
	);
};

export default EditPageTittleBtn;
