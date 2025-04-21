'use client';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import styles from './styles.module.scss';
import { ActionsEnum } from '@/context/types';

const HamburgerBtn = () => {
	const { dispatch, state } = useSafeContext(AppContext);

	const openNavigation = () => {
		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isFixed: true } });
	};

	const hintNavigation = () => {
		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isFixed: false } });
	};

	if (state.isNavigationFixed) return null;

	return (
		<button
			aria-controls="side_navigation"
			aria-expanded={state.isNavigationOpen}
			aria-label="Open Menu"
			className={styles.button}
			onClick={openNavigation}
			onMouseEnter={hintNavigation}
		>
			<svg className={styles.svg} aria-hidden="true" role="graphics-symbol" viewBox="0 0 14 14">
				<path d="M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z"></path>
			</svg>
		</button>
	);
};

export default HamburgerBtn;
