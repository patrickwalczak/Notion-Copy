'use client';

import React from 'react';
import styles from './styles.module.scss';
import DoubleChevronRight from '@/components/SVGs/DoubleChevronRight';
import { AppContext } from '@/context/AppContext';
import { ActionsEnum } from '@/context/types';
import { useSafeContext } from '@/hooks/useSafeContext';

const CloseNavigation = () => {
	const { state, dispatch } = useSafeContext(AppContext);

	// add a proper button for closing navigation and add logic to hide it when the navigation is not fixed

	const closeNavigation = () => {
		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isLocked: false } });
	};

	if (!state.isNavigationLocked) return null;

	return (
		<button className={styles.closeNavigationBtn} onClick={closeNavigation} title="Close navigation">
			<DoubleChevronRight />
		</button>
	);
};

export default CloseNavigation;
