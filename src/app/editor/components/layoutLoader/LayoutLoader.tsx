import React from 'react';
import styles from './styles.module.scss';
import { mergeClasses } from '@/lib/utils/mergeClasses';

const LayoutLoader = () => {
	return (
		<div className={mergeClasses(styles.loader, 'flex-center')}>
			<div className={styles.spinner} />
		</div>
	);
};

export default LayoutLoader;
