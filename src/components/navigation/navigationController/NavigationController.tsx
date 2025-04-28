import { DeviceType } from '@/types/shared';
import DesktopNavigation from '../desktopNavigation/DesktopNavigation';
import MobileNavigation from '../mobileNavigation/MobileNavigation';

export default async function NavigationController({ device }: { device: DeviceType }) {
	switch (device) {
		case 'mobile':
			return <MobileNavigation />;
		default:
			return <DesktopNavigation />;
	}
}
