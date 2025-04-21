'use client';
import React from 'react';
import styles from './header.module.scss';
import ChevronRight from '@/components/SVGs/ChevronRight';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import { ActionsEnum } from '@/context/types';

const user_name = 'Patrick';

const Header = () => {
	const { state, dispatch } = useSafeContext(AppContext);

	// add a proper button for closing navigation and add logic to hide it when the navigation is not fixed

	const closeNavigation = () => {
		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isFixed: false } });
	};

	return (
		<div className={styles.container}>
			<span className={styles.userInitial}>{user_name[0]}</span>
			<button className={styles.userNameBtn}>
				{user_name}
				<ChevronRight />
			</button>
			<button className={styles.actionBtn} onClick={closeNavigation}></button>
			<button className={styles.actionBtn}></button>
		</div>
	);
};

export default Header;
