import React from 'react';
import styles from './styles.module.scss';
import Logo from '@/components/SVGs/Logo';

const Header = () => {
	return (
		<nav className={`${styles.nav} flex align-center gap-075`}>
			<Logo />
		</nav>
	);
};

export default Header;
