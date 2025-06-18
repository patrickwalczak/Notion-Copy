import Header from '../components/header/Header';
import NavigationHead from './components/navigationHead/NavigationHead';
import CreatePage from './components/buttons/CreatePage';
import CloseNavigation from './components/buttons/CloseNavigation';
import { Suspense } from 'react';
import HomeLink from '../components/homeLink/HomeLink';
import PagesTreeServer from '../components/pagesTreeServer/PagesTreeServer';

const DesktopNavigation = () => {
	return (
		<NavigationHead>
			<Header>
				<CloseNavigation />
				<CreatePage />
			</Header>
			<HomeLink />
			<Suspense fallback={<div>Tree...</div>}>
				<PagesTreeServer />
			</Suspense>
		</NavigationHead>
	);
};

export default DesktopNavigation;
