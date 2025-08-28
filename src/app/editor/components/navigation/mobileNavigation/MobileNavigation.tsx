'use client';

import Header from '../components/header/Header';
import NavigationHead from './navigationHead/NavigationHead';
import HomeLink from '../components/homeLink/HomeLink';
import PageGroup from '../components/pageGroup/PageGroup';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import AddPageButton from '../components/AddPageButton';
import PageOperationsProvider from '@/lib/context/pageOperationsContext/PageOperationsContext';

const MobileNavigation = () => {
	const {
		state: { pages },
	} = useSafeContext(PagesContext);

	return (
		<NavigationHead>
			<PageOperationsProvider>
				<Header>
					<div />
				</Header>
				<div role="tree" className={`flex flex-column gap-1`}>
					<div className={`flex flex-column gap-025`}>
						{pages.map((page) => (
							<PageGroup key={page.id} page={page} />
						))}
					</div>
				</div>
				<AddPageButton />
				<HomeLink />
			</PageOperationsProvider>
		</NavigationHead>
	);
};

export default MobileNavigation;
