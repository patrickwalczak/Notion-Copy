import { DeviceType } from '@/types/shared';
import DesktopNavigation from '../desktopNavigation/DesktopNavigation';
import MobileNavigation from '../mobileNavigation/MobileNavigation';
import TabletNavigation from '../tabletNavigation/TabletNavigation';

export default async function NavigationController({ device }: { device: DeviceType }) {
	switch (device) {
		case 'mobile':
			return <MobileNavigation />;
		case 'tablet':
			return <TabletNavigation />;
		case 'desktop':
		default:
			return <DesktopNavigation />;
	}
}
