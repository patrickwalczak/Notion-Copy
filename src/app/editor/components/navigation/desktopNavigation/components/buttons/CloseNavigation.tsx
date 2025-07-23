'use client';

import React from 'react';
import styles from './styles.module.scss';
import DoubleChevronRight from '@/components/SVGs/DoubleChevronRight';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { UserContext } from '@/lib/context/userContext/UserProvider';

const CloseNavigation = () => {
	const {
		state: {
			userPreferences: { isNavigationLocked },
		},
		dispatch,
	} = useSafeContext(UserContext);

	const closeNavigation = () => {
		dispatch({ type: 'toggleNavigation', payload: { isOpen: true, isLocked: false } });
	};

	if (!isNavigationLocked) return null;

	return (
		<button className={`${styles.closeNavigationBtn} primaryButton`} onClick={closeNavigation} title="Close navigation">
			<DoubleChevronRight />
		</button>
	);
};

export default CloseNavigation;
