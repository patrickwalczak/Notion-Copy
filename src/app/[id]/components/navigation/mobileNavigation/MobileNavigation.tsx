'use client';

import styles from './styles.module.scss';
import Header from '../components/header/Header';
import NavigationHead from './navigationHead/NavigationHead';
import HomeLink from '../components/homeLink/HomeLink';
import Plus from '@/components/SVGs/Plus';
import PageGroup from '../components/pageGroup/PageGroup';
import { useAppSelector } from '@/lib/store/hooks';

const MobileNavigation = () => {
	const { pages } = useAppSelector((state) => state.pages);

	return (
		<NavigationHead>
			<Header>
				<div />
			</Header>
			<div role="tree" className={`flex-column gap-1`}>
				<div className={`flex-column gap-025`}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} />
					))}
				</div>
			</div>
			<button className={`${styles.newPageBtn} nav-element flex-align-center gap-050 button-empty`}>
				<Plus className="plus-svg flex-grow-0" />
				<span className="block truncate flex-grow-1">Add new</span>
			</button>
			<HomeLink />
		</NavigationHead>
	);
};

export default MobileNavigation;
