'use client';
import React from 'react';
import styles from './styles.module.scss';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';

const EditPageNameBtn = ({ pageName, clickHandler }: { pageName: string; clickHandler: () => void }) => {
	return (
		<button
			aria-label="Edit page title"
			onClick={clickHandler}
			className={`${styles.pageTitleBtn} truncate button-empty bg-transition bg-hover px-050 py-025`}
		>
			{pageName || NO_TITLE_PLACEHOLDER}
		</button>
	);
};

export default EditPageNameBtn;
