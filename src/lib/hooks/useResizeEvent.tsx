import { useEffect } from 'react';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '@/lib/constants';
import { DeviceType } from '@/types/shared';
import { UserContext } from '../context/userContext/UserProvider';
import { useSafeContext } from './useSafeContext';

export const useResizeEvent = () => {
	const {
		state: { device },
		dispatch,
	} = useSafeContext(UserContext);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			let newDevice: DeviceType = device;

			if (width >= DESKTOP_WIDTH) newDevice = 'desktop';
			else if (width >= TABLET_WIDTH) newDevice = 'tablet';
			else newDevice = 'mobile';

			if (device !== newDevice) dispatch({ type: 'changeDevice', payload: newDevice });
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [device, dispatch]);
};
