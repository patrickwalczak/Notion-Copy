import ReduxProvider from '@/lib/store/ReduxProvider';
import AppClient from './components/appClient/AppClient';
import NavigationController from './components/navigation/navigationController/NavigationController';
import './index.scss';
import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<ReduxProvider>
			<AppClient>
				<Suspense fallback={<div>Navigation...</div>}>
					<NavigationController />
				</Suspense>
				{children}
			</AppClient>
		</ReduxProvider>
	);
}
