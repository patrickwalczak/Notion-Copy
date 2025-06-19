import React from 'react';
import styles from './styles.module.scss';

const PageLoader = () => {
	return (
		<div className={styles.skeletonWrapper}>
			<div className={styles.skeletonBox}></div>
			<div className={`${styles.skeletonBox} ${styles.short}`}></div>
			<div className={styles.skeletonBox}></div>
		</div>
	);
};

export default PageLoader;
