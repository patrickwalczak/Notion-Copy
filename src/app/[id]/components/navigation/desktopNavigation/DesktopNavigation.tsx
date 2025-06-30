'use client';

import Header from '../components/header/Header';
import NavigationHead from './components/navigationHead/NavigationHead';
import CreatePage from './components/buttons/CreatePage';
import CloseNavigation from './components/buttons/CloseNavigation';
import HomeLink from '../components/homeLink/HomeLink';
import PageGroup from '../components/pageGroup/PageGroup';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

const DesktopNavigation = () => {
	const {
		state: { pages },
	} = useSafeContext(PagesContext);

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
