'use client';

import { UserContext } from '@/lib/context/userContext/UserProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';

const NAV_WIDTH = 320; //px

const NavigationHead = ({ children }: { children: React.ReactNode }) => {
	const {
		state: {
			userPreferences: { isNavigationOpen },
		},
		dispatch,
	} = useSafeContext(UserContext);

	const [touchStartX, setTouchStartX] = useState<number | null>(null);
	const [touchDeltaX, setTouchDeltaX] = useState(0);

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (touchStartX === null) return;

		const currentX = e.touches[0].clientX;

		const deltaX = currentX - touchStartX;

		if (isNavigationOpen) {
			// prevent actions on short, rightward, or excessive swipes
			if (deltaX >= -20 && Math.abs(deltaX) < NAV_WIDTH) return;

			setTouchDeltaX(NAV_WIDTH + deltaX);
		} else if (deltaX >= 20 && deltaX < NAV_WIDTH) {
			// prevent actions on short, leftward, or excessive swipes
			setTouchDeltaX(deltaX);
		}
	};

	const handleTouchEnd = () => {
		const navWidthHalf = NAV_WIDTH / 2;

		if (touchDeltaX > navWidthHalf) {
			dispatch({ type: 'toggleNavigation', payload: { isOpen: true } });
			setTouchDeltaX(NAV_WIDTH);
		} else {
			dispatch({ type: 'toggleNavigation', payload: { isOpen: false } });
			setTouchDeltaX(0);
		}
	};

	useEffect(() => {
		if (document?.body) {
			document.body.addEventListener('touchstart', handleTouchStart, { passive: true });
			document.body.addEventListener('touchmove', handleTouchMove, { passive: true });
			document.body.addEventListener('touchend', handleTouchEnd, { passive: true });
		}

		return () => {
			document.body.removeEventListener('touchstart', handleTouchStart);
			document.body.removeEventListener('touchmove', handleTouchMove);
			document.body.removeEventListener('touchend', handleTouchEnd);
		};
	}, [touchDeltaX, touchStartX]);

	useEffect(() => {
		if (isNavigationOpen) setTouchDeltaX(NAV_WIDTH);
		else setTouchDeltaX(0);
	}, [isNavigationOpen]);

	return (
		<nav
			id="side_navigation"
			aria-hidden={!isNavigationOpen}
			role="navigation"
			style={{ transform: `translateX(${touchDeltaX}px)` }}
			data-css-is-open={isNavigationOpen}
			className={`${styles.navigation} navigation flex flex-column row-gap-050 px-050`}
		>
			{children}
		</nav>
	);
};

export default NavigationHead;
