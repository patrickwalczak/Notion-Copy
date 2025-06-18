'use client';

import React from 'react';
import styles from './styles.module.scss';
import DoubleChevronRight from '@/components/SVGs/DoubleChevronRight';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleNavigation } from '@/lib/store/features/user/userSlice';

const CloseNavigation = () => {
	const { isNavigationLocked } = useAppSelector((state) => state.user.userPreferences);

	const dispatch = useAppDispatch();

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
