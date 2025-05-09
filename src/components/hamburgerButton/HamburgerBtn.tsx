'use client';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import styles from './styles.module.scss';
import { ActionsEnum } from '@/context/types';
import HamburgerIcon from '../SVGs/HamburgerIcon';
import DoubleChevronRight from '../SVGs/DoubleChevronRight';

const HamburgerBtn = () => {
	const {
		dispatch,
		state: { device, isNavigationOpen, isNavigationLocked },
	} = useSafeContext(AppContext);
	const isVisible = device === 'mobile' || !isNavigationLocked;
	const isIconSwapped = !isNavigationLocked && isNavigationOpen;

	const openNavigation = () => {
		dispatch({ type: ActionsEnum.TOGGLE_NAVIGATION, payload: { isOpen: true, isLocked: true } });
	};

	if (!isVisible) return null;

	return (
		<button
			aria-controls="side_navigation"
			aria-expanded={isNavigationOpen}
			aria-label="Open Menu"
			className={styles.button}
			onClick={openNavigation}
		>
			{isIconSwapped ? <DoubleChevronRight className={styles.chevronSvg} /> : <HamburgerIcon className={styles.svg} />}
		</button>
	);
};

export default HamburgerBtn;
