'use client';
import React from 'react';
import styles from './styles.module.scss';
import { NO_TITLE_PLACEHOLDER } from '@/constants';

const EditPageNameBtn = ({ pageName, clickHandler }: { pageName: string; clickHandler: () => void }) => {
	return (
		<button
			aria-label="Edit page title"
			onClick={clickHandler}
			className={`${styles.pageTitleBtn} truncate button-empty bg-transition bg-hover p-x-050 p-y-025`}
		>
			{pageName || NO_TITLE_PLACEHOLDER}
		</button>
	);
};

export default EditPageNameBtn;
