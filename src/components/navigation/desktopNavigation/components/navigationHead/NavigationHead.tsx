'use client';

import styles from './styles.module.scss';
import { useEffect, useState, ReactNode } from 'react';
import { AppContext } from '@/context/AppContext';
import { ActionsEnum } from '@/context/types';
import { useSafeContext } from '@/hooks/useSafeContext';

const NAV_WIDTH = 320; //px

const NavigationHead = ({ children }: { children: ReactNode }) => {
	const { state, dispatch } = useSafeContext(AppContext);

	const trackCursorMovement = (e: MouseEvent) => {
		let threshold = 50;

		if (state.isNavigationOpen) threshold = NAV_WIDTH;

		const isOpen = e.clientX < threshold;

		if (isOpen === state.isNavigationOpen) return;

		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen, isLocked: false } });
	};

	useEffect(() => {
		if (!state.isNavigationLocked) {
			document.body.addEventListener('mousemove', trackCursorMovement);
		}

		return () => {
			document.body.removeEventListener('mousemove', trackCursorMovement);
		};
	}, [state.isNavigationLocked, state.isNavigationOpen]);

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
