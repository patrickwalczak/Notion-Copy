'use client';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import styles from './styles.module.scss';
import { ActionsEnum } from '@/context/types';
import HamburgerIcon from '../SVGs/HamburgerIcon';
import DoubleChevronRight from '../SVGs/DoubleChevronRight';

const HamburgerBtn = () => {
	const { dispatch, state } = useSafeContext(AppContext);

	const openNavigation = () => {
		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isLocked: true } });
	};

	return (
		<button
			aria-controls="side_navigation"
			aria-expanded={state.isNavigationOpen}
			aria-label="Open Menu"
			className={styles.button}
			onClick={openNavigation}
		>
			{state.isNavigationOpen ? (
				<DoubleChevronRight className={styles.chevronSvg} />
			) : (
				<HamburgerIcon className={styles.svg} />
			)}
		</button>
	);
};

export default HamburgerBtn;
