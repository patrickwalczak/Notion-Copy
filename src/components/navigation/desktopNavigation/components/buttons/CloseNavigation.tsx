'use client';

import React from 'react';
import styles from './styles.module.scss';
import DoubleChevronRight from '@/components/SVGs/DoubleChevronRight';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleNavigation } from '@/lib/features/ui/uiSlice';

const CloseNavigation = () => {
	const { isNavigationLocked } = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();
	// add a proper button for closing navigation and add logic to hide it when the navigation is not fixed

	const closeNavigation = () => {
		dispatch(toggleNavigation({ isOpen: true, isLocked: false }));
	};

	if (!isNavigationLocked) return null;

	return (
		<button
			className={`${styles.closeNavigationBtn} p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
			onClick={closeNavigation}
			title="Close navigation"
		>
			<DoubleChevronRight />
		</button>
	);
};

export default CloseNavigation;
