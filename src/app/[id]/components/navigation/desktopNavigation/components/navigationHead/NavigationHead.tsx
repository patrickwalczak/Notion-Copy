'use client';

import styles from './styles.module.scss';
import { useEffect, ReactNode, useCallback } from 'react';
import { UserContext } from '@/lib/context/userContext/UserProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const NAV_WIDTH = 320; //px

const NavigationHead = ({ children }: { children: ReactNode }) => {
	const {
		state: {
			userPreferences: { isNavigationLocked, isNavigationOpen },
		},
		dispatch,
	} = useSafeContext(UserContext);

	const trackCursorMovement = useCallback(
		(e: MouseEvent) => {
			let threshold = 50;

			if (isNavigationOpen) threshold = NAV_WIDTH;

			const isOpen = e.clientX < threshold;

			if (isOpen === isNavigationOpen) return;

			dispatch({ type: 'toggleNavigation', payload: { isOpen, isLocked: false } });
		},
		[dispatch, isNavigationOpen]
	);

	useEffect(() => {
		if (!isNavigationLocked) {
			document.body.addEventListener('mousemove', trackCursorMovement);
		}

		return () => {
			document.body.removeEventListener('mousemove', trackCursorMovement);
		};
	}, [isNavigationLocked, isNavigationOpen, trackCursorMovement]);

	return (
		<div className={styles.navigationWrapper} style={{ width: isNavigationLocked ? NAV_WIDTH : 0 }}>
			<nav
				id="side_navigation"
				aria-hidden={!isNavigationOpen}
				role="navigation"
				style={{ width: NAV_WIDTH, right: isNavigationOpen ? (isNavigationLocked ? 0 : -NAV_WIDTH) : 0 }}
				data-css-is-open={isNavigationOpen}
				data-css-is-locked={isNavigationLocked}
				className={`${styles.navigation} navigation flex-column row-gap-050 p-x-050`}
			>
				{children}
			</nav>
		</div>
	);
};

export default NavigationHead;
