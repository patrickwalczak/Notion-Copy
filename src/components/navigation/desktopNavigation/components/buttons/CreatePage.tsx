'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import CreatePageIcon from '@/components/SVGs/CreatePage';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import { ActionsEnum } from '@/context/types';

const CreatePage = () => {
	const { state, dispatch } = useSafeContext(AppContext);
	const router = useRouter();

	const createPage = () => {
		const id = Date.now();
		// send a request to create a new page
		// redirect to the page
		// add the page to the state
		dispatch({
			type: ActionsEnum.CREATE_PAGE,
			payload: {
				id,
				title: '',
				icon: '',
				type: 'page',
				data: {},
				children: [],
				parentId: null,
			},
		});
		router.push(`?page=${id}`);
	};

	return (
		<button
			className={`${styles.createPageBtn} p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
			onClick={createPage}
			title="Create a new page"
		>
			<CreatePageIcon />
		</button>
	);
};

export default CreatePage;
