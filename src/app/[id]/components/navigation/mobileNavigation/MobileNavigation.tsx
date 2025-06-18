import styles from './styles.module.scss';
import Header from '../components/header/Header';
import NavigationHead from './navigationHead/NavigationHead';
import HomeLink from '../components/homeLink/HomeLink';
import Plus from '@/components/SVGs/Plus';
import { Suspense } from 'react';
import PagesTreeServer from '../components/pagesTreeServer/PagesTreeServer';

const MobileNavigation = () => {
	return (
		<NavigationHead>
			<Header>
				<div />
			</Header>
			<Suspense fallback={<div>Tree...</div>}>
				<PagesTreeServer />
			</Suspense>
			<button className={`${styles.newPageBtn} nav-element flex-align-center gap-050 button-empty`}>
				<Plus className="plus-svg flex-grow-0" />
				<span className="block truncate flex-grow-1">Add new</span>
			</button>
			<HomeLink />
		</NavigationHead>
	);
};

export default MobileNavigation;
