'use client';

import styles from './styles.module.scss';
import { useEffect, ReactNode, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { toggleNavigation } from '@/lib/store/features/ui/uiSlice';

const NAV_WIDTH = 320; //px

const NavigationHead = ({ children }: { children: ReactNode }) => {
	const state = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();

	const trackCursorMovement = useCallback(
		(e: MouseEvent) => {
			let threshold = 50;

			if (state.isNavigationOpen) threshold = NAV_WIDTH;

			const isOpen = e.clientX < threshold;

			if (isOpen === state.isNavigationOpen) return;

			dispatch(toggleNavigation({ isOpen, isLocked: false }));
		},
		[dispatch, state.isNavigationOpen]
	);

	useEffect(() => {
		if (!state.isNavigationLocked) {
			document.body.addEventListener('mousemove', trackCursorMovement);
		}

		return () => {
			document.body.removeEventListener('mousemove', trackCursorMovement);
		};
	}, [state.isNavigationLocked, state.isNavigationOpen, trackCursorMovement]);

	return (
		<div className={styles.navigationWrapper} style={{ width: state.isNavigationLocked ? NAV_WIDTH : 0 }}>
			<nav
				id="side_navigation"
				aria-hidden={!state.isNavigationOpen}
				role="navigation"
				style={{ width: NAV_WIDTH, right: state.isNavigationOpen ? (state.isNavigationLocked ? 0 : -NAV_WIDTH) : 0 }}
				data-css-is-open={state.isNavigationOpen}
				data-css-is-locked={state.isNavigationLocked}
				className={`${styles.navigation} navigation flex-column row-gap-050 p-x-050`}
			>
				{children}
			</nav>
		</div>
	);
};

export default NavigationHead;
