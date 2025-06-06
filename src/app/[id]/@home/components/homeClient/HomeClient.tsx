import React from 'react';
import styles from './styles.module.scss';
import PageHeader from '@/app/[id]/components/pageHeader/PageHeader';

const HomeClient = () => {
	return (
		<main className={`flex-grow-1`}>
			<PageHeader />
		</main>
	);
};

export default HomeClient;
