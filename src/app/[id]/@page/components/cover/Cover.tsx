'use client';

import React from 'react';
import styles from './styles.module.scss';
import { PageContext } from '@/app/[id]/@page/context/PageContext';
import { useSafeContext } from '@/hooks/useSafeContext';

export const Cover = () => {
	const { state, dispatch } = useSafeContext(PageContext);

	if (!state.cover) return null;

	return (
		<div className={styles.container}>
			<img src={state.cover || ''} alt="Cover" className={styles.img} />
		</div>
	);
};
