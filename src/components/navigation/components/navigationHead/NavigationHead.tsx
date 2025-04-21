'use client';

import styles from '../../navigation.module.scss';
import React, { useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { ActionsEnum } from '@/context/types';
import { useSafeContext } from '@/hooks/useSafeContext';

const NAV_WIDTH = 320; //px

const NavigationHead = ({ children }: { children: React.ReactNode }) => {
	const { state, dispatch } = useSafeContext(AppContext);
	const [width, setWidth] = useState(NAV_WIDTH);
	const [touchStartX, setTouchStartX] = useState<number | null>(null);
	const [touchDeltaX, setTouchDeltaX] = useState(0);

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (touchStartX === null) return;

		const currentX = e.touches[0].clientX;

		const deltaX = currentX - touchStartX;

		if (deltaX >= NAV_WIDTH || deltaX < 0) return;

		// prevent actions on short, leftward, or excessive swipes
		if (deltaX < 20) return;

		if (state.isNavigationOpen) setTouchDeltaX(NAV_WIDTH - deltaX);
		else setTouchDeltaX(deltaX);
	};

	const handleTouchEnd = () => {
		const navWidthHalf = NAV_WIDTH / 2;

		if (touchDeltaX > navWidthHalf) {
			dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isFixed: true } });
			setTouchDeltaX(NAV_WIDTH);
		} else {
			dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: false, isFixed: false } });
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

	const trackCursorMovement = (e: MouseEvent) => {
		if (e.clientX > NAV_WIDTH) {
			dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: false, isFixed: false } });
		}
	};

	useEffect(() => {
		if (!state.isNavigationFixed && state.isNavigationOpen) {
			document.body.addEventListener('mousemove', trackCursorMovement);
		}

		return () => {
			document.body.removeEventListener('mousemove', trackCursorMovement);
		};
	}, [state.isNavigationFixed, state.isNavigationOpen]);

	useEffect(() => {
		if (state.isNavigationOpen) setTouchDeltaX(NAV_WIDTH);
		else setTouchDeltaX(0);
	}, [state.isNavigationOpen]);

	return (
		<nav
			id="side_navigation"
			aria-hidden={state.isNavigationOpen}
			role="navigation"
			style={{ transform: `translateX(${touchDeltaX}px)`, width: `${width}px` }}
			data-css-is-open={state.isNavigationOpen}
			className={styles.navigation}
		>
			{children}
		</nav>
	);
};

export default NavigationHead;
