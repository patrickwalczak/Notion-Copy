import { useEffect } from 'react';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '@/lib/constants';
import { DeviceType } from '@/types/shared';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { changeDevice } from '@/lib/store/features/ui/uiSlice';

export const useResizeEvent = () => {
	const device = useAppSelector((state) => state.ui.device);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			let newDevice: DeviceType = device;

			if (width >= DESKTOP_WIDTH) newDevice = 'desktop';
			else if (width >= TABLET_WIDTH) newDevice = 'tablet';
			else newDevice = 'mobile';

			if (device !== newDevice) dispatch(changeDevice(newDevice));
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [device, dispatch]);
};
