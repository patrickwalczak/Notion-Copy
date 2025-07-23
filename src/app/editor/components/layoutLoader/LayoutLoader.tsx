import React from 'react';
import styles from './styles.module.scss';

const LayoutLoader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.spinner} />
		</div>
	);
};

export default LayoutLoader;
