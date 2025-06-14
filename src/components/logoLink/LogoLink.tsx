import React from 'react';
import Logo from '@/components/SVGs/Logo';
import Link from 'next/link';
import styles from './styles.module.scss';

const LogoLink = () => {
	return (
		<Link href={'/'} className={`${styles.link}`}>
			<Logo />
		</Link>
	);
};

export default LogoLink;
