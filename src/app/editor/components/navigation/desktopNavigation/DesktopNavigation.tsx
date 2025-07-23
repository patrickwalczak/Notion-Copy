'use client';

import Header from '../components/header/Header';
import NavigationHead from './components/navigationHead/NavigationHead';
import CreatePage from './components/buttons/CreatePage';
import CloseNavigation from './components/buttons/CloseNavigation';
import HomeLink from '../components/homeLink/HomeLink';
import PageGroup from '../components/pageGroup/PageGroup';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import AddPageButton from '../components/AddPageButton';
import Search from '../components/Search';
import Inbox from '../components/Inbox';
import Settings from '../components/Settings';
import Trash from '../components/Trash';
import PageOperationsProvider from '@/lib/context/pageOperationsContext/PageOperationsContext';

const DesktopNavigation = () => {
	const {
		state: { pages },
	} = useSafeContext(PagesContext);

	return (
		<NavigationHead>
			<PageOperationsProvider>
				<Header>
					<CloseNavigation />
					<CreatePage />
				</Header>
				<div className={`flex-column gap-1`}>
					<div className={`flex-column gap-025`}>
						<Search />
						<HomeLink />
						<Inbox />
					</div>
					<div className={`flex-column gap-025`}>
						<div role="tree" className={`flex-column gap-1`}>
							<div className={`flex-column gap-025`}>
								{pages.map((page) => (
									<PageGroup key={page.id} page={page} />
								))}
							</div>
						</div>
						<AddPageButton />
					</div>
					<div className={`flex-column gap-025`}>
						<Settings />
						<Trash />
					</div>
				</div>
			</PageOperationsProvider>
		</NavigationHead>
	);
};

export default DesktopNavigation;
