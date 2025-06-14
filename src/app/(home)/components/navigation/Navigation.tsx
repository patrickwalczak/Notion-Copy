'use client';

import './utils.scss';
import React, { createContext } from 'react';
import styles from './styles.module.scss';
import GetNotionLink from './GetNotionLink';
import HamburgerButton from './hamburgerButton/HamburgerButton';
import ExpandMenu from './expandMenu/ExpandMenu';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import Link from 'next/link';
import Links from './links/Links';
import LogoLink from '@/components/logoLink/LogoLink';

export const NavigationContext = createContext<null | any>(null);

const Navigation = () => {
	const { isOpen, toggle, close, open } = useIsOpenState();

	return (
		<NavigationContext.Provider value={{ isOpen, toggle, close, open }}>
			<nav className={`${styles.navigationWrapper}`} data-css-is-open={isOpen}>
				<div className={`${styles.container}`}>
					<LogoLink />
					<Links />
					<div className={`${styles.rightContainer} flex-align-center gap-075`}>
						<Link href={'/login'} className={`${styles.logInLink} navElement`}>
							Log in
						</Link>
						<GetNotionLink />
						<HamburgerButton />
					</div>
				</div>
				<ExpandMenu />
			</nav>
		</NavigationContext.Provider>
	);
};

export default Navigation;
