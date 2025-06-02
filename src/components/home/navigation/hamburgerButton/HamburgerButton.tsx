import React, { useContext } from 'react';
import HamburgerIcon from '@/components/SVGs/HamburgerIcon';

import styles from './styles.module.scss';
import { NavigationContext } from '../Navigation';
import Close from '@/components/SVGs/Close';

const HamburgerButton = () => {
	const { toggle, isOpen } = useContext(NavigationContext);

	return (
		<button onClick={toggle} aria-label="Toggle main menu" className={` flex-center p-050 button-empty`}>
			{isOpen ? (
				<Close className={`${styles.icon} flex-shrink-0 fill-black`} />
			) : (
				<HamburgerIcon className={`${styles.icon} flex-shrink-0 fill-black`} />
			)}
		</button>
	);
};

export default HamburgerButton;
