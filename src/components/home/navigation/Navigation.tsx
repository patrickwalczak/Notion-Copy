'use client';

import React, { createContext } from 'react';
import styles from './styles.module.scss';
import GetNotionLink from './getNotionLink/GetNotionLink';
import HamburgerButton from './hamburgerButton/HamburgerButton';
import LogoLink from './logoLink/LogoLink';
import ExpandMenu from './expandMenu/ExpandMenu';
import useIsOpenState from '@/lib/hooks/useIsOpenState';

export const NavigationContext = createContext<null | any>(null);

const Navigation = () => {
	const { isOpen, toggle, close, open } = useIsOpenState();

	return (
		<NavigationContext.Provider value={{ isOpen, toggle, close, open }}>
			<nav className={`${styles.navigationWrapper}`} data-css-is-open={isOpen}>
				<div className={`${styles.container} p-1`}>
					<LogoLink />
					<div className={`${styles.rightContainer} flex-align-center gap-1`}>
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
