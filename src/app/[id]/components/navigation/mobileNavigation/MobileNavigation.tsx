'use client';

import styles from './styles.module.scss';
import Header from '../components/header/Header';
import NavigationHead from './navigationHead/NavigationHead';
import PageGroup from '../components/pageGroup/PageGroup';
import HomeLink from '../components/homeLink/HomeLink';
import Plus from '@/components/SVGs/Plus';
import { useAppSelector } from '@/lib/store/hooks';

const MobileNavigation = () => {
	console.log('Mobile');

	const { pages } = useAppSelector((state) => state.pages);
	const device = useAppSelector((state) => state.ui.device);

	return (
		<NavigationHead>
			<Header>
				<div />
			</Header>
			<div role="tree" className={`flex-column gap-050`}>
				<div className={`flex-column gap-050`}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} device={device} />
					))}
				</div>
				<button className={`${styles.newPageBtn} nav-element flex-align-center gap-050 button-empty`}>
					<Plus className="plus-svg flex-grow-0" />
					<span className="block truncate flex-grow-1">Add new</span>
				</button>
			</div>
			<HomeLink />
		</NavigationHead>
	);
};

export default MobileNavigation;
