'use client';

import React from 'react';
import styles from './styles.module.scss';
import CreatePageIcon from '@/components/SVGs/CreatePage';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageOperationsContext } from '@/lib/context/pageOperationsContext/PageOperationsContext';

const CreatePage = () => {
	const { addPage } = useSafeContext(PageOperationsContext);

	const handleClick = async () => {
		console.log('click');

		await addPage();
	};

	return (
		<button
			className={`${styles.createPageBtn} p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
			onClick={handleClick}
			title="Create a new page"
		>
			<CreatePageIcon />
		</button>
	);
};

export default CreatePage;
