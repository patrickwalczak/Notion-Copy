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
		<button
			aria-label={ariaLabel}
			onClick={clickHandler}
			className={`${styles.pageTitleBtn} truncate button-empty bg-transition bg-hover p-x-050 p-y-025`}
		>
			{pageTitle}
		</button>
	);
};

export default EditPageTittleBtn;
