'use client';

import { ReactNode } from 'react';
import { useResizeEvent } from '@/lib/hooks/useResizeEvent';
import { useThemeMode } from '@/lib/hooks/useThemeMode';

const AppClient = ({ children }: { children: ReactNode }) => {
	useThemeMode();
	useResizeEvent();

	return <div className={`flex`}>{children}</div>;
};

export default AppClient;
