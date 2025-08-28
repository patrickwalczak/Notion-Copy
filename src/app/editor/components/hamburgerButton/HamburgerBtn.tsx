'use client';

import styles from './styles.module.scss';
import HamburgerIcon from '../../../../components/SVGs/HamburgerIcon';
import DoubleChevronRight from '../../../../components/SVGs/DoubleChevronRight';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { UserContext } from '@/lib/context/userContext/UserProvider';
import { setNavigationCookies } from '@/lib/actions/navigationCookies';

const HamburgerBtn = () => {
	const {
		state: {
			device,
			userPreferences: { isNavigationLocked, isNavigationOpen },
		},
		dispatch,
	} = useSafeContext(UserContext);

	const isVisible = device === 'mobile' || !isNavigationLocked;
	const isIconSwapped = !isNavigationLocked && isNavigationOpen;

	const openNavigation = () => {
		const newState = { isOpen: true, isLocked: true };
		dispatch({ type: 'toggleNavigation', payload: newState });
		setNavigationCookies(newState);
	};

	if (!isVisible) return null;

	return (
		<button
			aria-controls="side_navigation"
			aria-expanded={isNavigationOpen}
			aria-label="Open Menu"
			className={`${styles.button} primaryButton`}
			onClick={openNavigation}
		>
			{isIconSwapped ? <DoubleChevronRight className={styles.chevronSvg} /> : <HamburgerIcon className={styles.svg} />}
		</button>
	);
};

export default HamburgerBtn;
