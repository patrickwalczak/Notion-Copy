'use client';
import styles from './styles.module.scss';
import HamburgerIcon from '../../../../components/SVGs/HamburgerIcon';
import DoubleChevronRight from '../../../../components/SVGs/DoubleChevronRight';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleNavigation } from '@/lib/store/features/ui/uiSlice';

const HamburgerBtn = () => {
	const { isNavigationLocked, isNavigationOpen, device } = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();

	const isVisible = device === 'mobile' || !isNavigationLocked;
	const isIconSwapped = !isNavigationLocked && isNavigationOpen;

	const openNavigation = () => {
		dispatch(toggleNavigation({ isOpen: true, isLocked: true }));
	};

	if (!isVisible) return null;

	return (
		<button
			aria-controls="side_navigation"
			aria-expanded={isNavigationOpen}
			aria-label="Open Menu"
			className={`${styles.button} flex-center button-empty p-025 bg-transition bg-hover`}
			onClick={openNavigation}
		>
			{isIconSwapped ? <DoubleChevronRight className={styles.chevronSvg} /> : <HamburgerIcon className={styles.svg} />}
		</button>
	);
};

export default HamburgerBtn;
