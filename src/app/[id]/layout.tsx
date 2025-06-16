import './index.scss';
import { ReactNode, Suspense } from 'react';

import ServerContextProvider from './components/serverContextProvider/ServerContextProvider';

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ServerContextProvider>{children}</ServerContextProvider>;
		</Suspense>
	);
}
