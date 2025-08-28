'use client';

import React from 'react';
import styles from './styles.module.scss';
import DoubleChevronRight from '@/components/SVGs/DoubleChevronRight';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { UserContext } from '@/lib/context/userContext/UserProvider';
import { setNavigationCookies } from '@/lib/actions/navigationCookies';

const CloseNavigation = () => {
	const {
		state: {
			userPreferences: { isNavigationLocked },
		},
		dispatch,
	} = useSafeContext(UserContext);

	const closeNavigation = () => {
		const newState = { isOpen: true, isLocked: false };
		dispatch({ type: 'toggleNavigation', payload: newState });
		setNavigationCookies(newState);
	};

	if (!isNavigationLocked) return null;

	return (
		<button className={`${styles.closeNavigationBtn} primaryButton`} onClick={closeNavigation} title="Close navigation">
			<DoubleChevronRight />
		</button>
	);
};

export default CloseNavigation;
