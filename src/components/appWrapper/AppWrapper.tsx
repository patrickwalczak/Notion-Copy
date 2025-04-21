'use client';

import React from 'react';
import styles from './styles.module.scss';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	const { state, dispatch } = useSafeContext(AppContext);

	return <div className={styles.container}>{children}</div>;
};

export default AppWrapper;
