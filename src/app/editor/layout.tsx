import './index.scss';
import { ReactNode, Suspense } from 'react';
import AppServer from './components/appServer/AppServer';
import LayoutLoader from './components/layoutLoader/LayoutLoader';

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={<LayoutLoader />}>
			<AppServer>{children}</AppServer>
		</Suspense>
	);
}
