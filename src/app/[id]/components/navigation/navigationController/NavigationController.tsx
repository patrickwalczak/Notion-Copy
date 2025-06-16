'use client';

import '../index.scss';
import DesktopNavigation from '../desktopNavigation/DesktopNavigation';
import MobileNavigation from '../mobileNavigation/MobileNavigation';
import { getDevice } from '@/actions/cookies';
import { use } from 'react';

export default function NavigationController() {
	const device = use(getDevice());
	console.log(device);

	switch (device) {
		case 'mobile':
			return <MobileNavigation />;
		default:
			return <DesktopNavigation />;
	}
}
