'use client';

import { UserContext } from '@/lib/context/userContext/UserProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import DesktopNavigation from './desktopNavigation/DesktopNavigation';
import './index.scss';
import MobileNavigation from './mobileNavigation/MobileNavigation';

export default function NavigationController() {
	const {
		state: { device },
	} = useSafeContext(UserContext);

	switch (device) {
		case 'mobile':
			return <MobileNavigation />;
		default:
			return <DesktopNavigation />;
	}
}
