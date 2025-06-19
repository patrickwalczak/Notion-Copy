'use client';

import DesktopNavigation from './desktopNavigation/DesktopNavigation';
import './index.scss';
import MobileNavigation from './mobileNavigation/MobileNavigation';
import { useAppSelector } from '@/lib/store/hooks';

export default function NavigationController() {
	const device = useAppSelector((state) => state.user.device);

	switch (device) {
		case 'mobile':
			return <MobileNavigation />;
		default:
			return <DesktopNavigation />;
	}
}
