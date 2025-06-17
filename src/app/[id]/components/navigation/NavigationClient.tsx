'use client';

import { DeviceType } from '@/types/shared';
import React, { useRef } from 'react';
import MobileNavigation from './mobileNavigation/MobileNavigation';
import DesktopNavigation from './desktopNavigation/DesktopNavigation';
import { useAppStore } from '@/lib/store/hooks';
import { initializePages } from '@/lib/store/features/pages/pagesSlice';
import { changeDevice } from '@/lib/store/features/ui/uiSlice';

// TODO pages: any
const NavigationClient = ({ device, pages }: { device: DeviceType; pages: any }) => {
	const store = useAppStore();
	const initialized = useRef(false);

	if (!initialized.current) {
		store.dispatch(changeDevice(device));
		store.dispatch(initializePages(pages));
		initialized.current = true;
	}

	switch (device) {
		case 'mobile':
			return <MobileNavigation />;
		default:
			return <DesktopNavigation />;
	}
};

export default NavigationClient;
