'use client';

import styles from './styles.module.scss';
import HamburgerBtn from '@/components/hamburgerButton/HamburgerBtn';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import Dots from '../SVGs/Dots';

const PageHeader = () => {
	const { state } = useSafeContext(AppContext);

	return (
		<header className={styles.header}>
			<div className={styles.leftElements}>{!state.isNavigationLocked && <HamburgerBtn />}</div>
			<button className={styles.button} aria-label="More">
				<Dots />
			</button>
		</header>
	);
};

export default PageHeader;
