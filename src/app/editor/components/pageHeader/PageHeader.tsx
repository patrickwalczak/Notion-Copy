import styles from './styles.module.scss';
import HamburgerBtn from '@/app/editor/components/hamburgerButton/HamburgerBtn';
import Dots from '../../../../components/SVGs/Dots';
import { ReactNode } from 'react';

const PageHeader = ({ children = null }: { children?: ReactNode | null }) => {
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
