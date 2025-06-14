import React from 'react';
import styles from './styles.module.scss';
import LogoLink from '@/components/logoLink/LogoLink';

const Header = () => {
	return (
		<nav className={`${styles.nav} flex-align-center gap-075`}>
			<LogoLink />
			{/* <div role="separator" className={`${styles.divider} flex-shrink-0`} /> */}
		</nav>
	);
};

export default Header;
