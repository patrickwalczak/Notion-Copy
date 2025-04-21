import { Dispatch, useEffect } from 'react';
import { ActionsEnum, ActionsType } from '@/context/types';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '@/constants';
import { DeviceType } from '@/types/shared';

export const useResizeEvent = (dispatch: Dispatch<ActionsType>, device: DeviceType) => {
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			let newDevice: DeviceType = device;

			if (width >= DESKTOP_WIDTH) newDevice = 'desktop';
			else if (width >= TABLET_WIDTH) newDevice = 'tablet';
			else newDevice = 'mobile';

			if (device !== newDevice) dispatch({ type: ActionsEnum.CHANGE_DEVICE, payload: newDevice });
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [device]);
};
