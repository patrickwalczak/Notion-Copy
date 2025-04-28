import React from 'react';
import styles from './styles.module.scss';
import CreatePageIcon from '@/components/SVGs/CreatePage';

const CreatePage = () => {
	return (
		<button className={styles.createPageBtn} title="Create a new page">
			<CreatePageIcon />
		</button>
	);
};

export default CreatePage;
