'use client';

import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { useResizeEvent } from '@/hooks/useResizeEvent';
import { useThemeMode } from '@/hooks/useThemeMode';

const AppClient = ({ children }: { children: ReactNode }) => {
	useThemeMode();
	useResizeEvent();

	return <div className={`${styles.container} flex`}>{children}</div>;
};

export default AppClient;
