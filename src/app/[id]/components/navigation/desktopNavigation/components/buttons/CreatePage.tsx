'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import CreatePageIcon from '@/components/SVGs/CreatePage';
import { useAppDispatch } from '@/lib/store/hooks';
import { createPage } from '@/lib/store/features/pages/pagesSlice';
import { createPageInDb } from '@/dummy';
import { dummyPage } from '@/dummy/page';

const CreatePage = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const handleClick = async () => {
		try {
			const page: any = await createPageInDb(dummyPage);
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
