'use client';

import styles from './styles.module.scss';
import HamburgerBtn from '@/components/hamburgerButton/HamburgerBtn';
import Dots from '../SVGs/Dots';
import { ReactNode } from 'react';
import { useAppSelector } from '@/lib/store/hooks';

const PageHeader = ({ children = null }: { children?: ReactNode | null }) => {
	const { device, isNavigationLocked, isNavigationOpen } = useAppSelector((state) => state.ui);

	return (
		<header className={`${styles.header} flex-align-center justify-between gap-1 p-x-075 p-y-050`}>
			<div className={`flex-align-center gap-075`}>
				<HamburgerBtn />
				{children}
			</div>
			<button className={`flex-center button-empty p-025`} aria-label="More">
				<Dots className={styles.svg} />
			</button>
		</header>
	);
};

export default PageHeader;
