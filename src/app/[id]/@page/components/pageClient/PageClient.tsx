'use client';

import React, { useEffect } from 'react';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';
import styles from './styles.module.scss';
import { PageTitle } from '../pageTitle/PageTitle';
import { Cover } from '@/app/[id]/@page/components/cover/Cover';
import EditPageName from '../../../components/editPageName/EditPageName';
import { useAppDispatch } from '@/lib/store/hooks';
import { initState } from '@/lib/store/features/page/pageSlice';

const PageClient = ({ pageData }) => {
	console.log(pageData);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initState(pageData));
	}, [pageData, dispatch]);

	return (
		<div className={`flex-grow-1`}>
			<PageHeader>
				<EditPageName />
			</PageHeader>
			<main className={styles.mainContent}>
				<Cover />
				<div className={styles.contentHeader}>
					<PageTitle />
				</div>
			</main>
		</div>
	);
};

export default PageClient;
