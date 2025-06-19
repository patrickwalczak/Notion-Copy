'use client';

import Header from '../components/header/Header';
import NavigationHead from './components/navigationHead/NavigationHead';
import CreatePage from './components/buttons/CreatePage';
import CloseNavigation from './components/buttons/CloseNavigation';
import HomeLink from '../components/homeLink/HomeLink';
import { useAppSelector } from '@/lib/store/hooks';
import PageGroup from '../components/pageGroup/PageGroup';

const DesktopNavigation = () => {
	const { pages } = useAppSelector((state) => state.pages);

	return (
		<NavigationHead>
			<Header>
				<CloseNavigation />
				<CreatePage />
			</Header>
			<HomeLink />
			<div role="tree" className={`flex-column gap-1`}>
				<div className={`flex-column gap-025`}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} />
					))}
				</div>
			</div>
		</NavigationHead>
	);
};

export default DesktopNavigation;
