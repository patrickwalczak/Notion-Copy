import React from 'react';
import styles from './styles.module.scss';
import LogoLink from '@/components/logoLink/LogoLink';

const Header = () => {
	return (
		<nav className={`${styles.nav} flex align-center gap-075`}>
			<LogoLink />
		</nav>
	);
};

export default Header;
