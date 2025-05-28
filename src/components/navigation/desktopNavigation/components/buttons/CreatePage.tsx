'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import CreatePageIcon from '@/components/SVGs/CreatePage';
import { useAppDispatch } from '@/lib/hooks';
import { createPage } from '@/lib/features/pages/pagesSlice';

const createPageInDb = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: Date.now(),
				name: 'New Page',
				icon: '',
				cover: '',
				type: 'page',
				children: [],
				parentId: null,
				isSaved: false,
			});
		}, 500);
	});
};

const CreatePage = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const handleClick = async () => {
		try {
			const page: any = await createPageInDb();
			dispatch(createPage(page));
			router.push(`?page=${page.id}`);
		} catch (error) {
			console.log(error);
		}
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
