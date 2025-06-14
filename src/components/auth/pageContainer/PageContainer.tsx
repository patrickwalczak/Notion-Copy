import React from 'react';
import styles from './styles.module.scss';

const PageContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className={`${styles.container} flex-column`}>{children}</div>;
};

export default PageContainer;
