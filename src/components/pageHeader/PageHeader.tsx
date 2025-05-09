'use client';

import styles from './styles.module.scss';
import HamburgerBtn from '@/components/hamburgerButton/HamburgerBtn';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import Dots from '../SVGs/Dots';
import { ReactNode } from 'react';

const PageHeader = ({ children = null }: { children?: ReactNode | null }) => {
	const {
		state: { device, isNavigationLocked, isNavigationOpen },
	} = useSafeContext(AppContext);

	return (
		<header className={styles.header}>
			<div className={styles.leftElements}>
				<HamburgerBtn />
				{children}
			</div>
			<button className={styles.button} aria-label="More">
				<Dots />
			</button>
		</header>
	);
};

export default PageHeader;
