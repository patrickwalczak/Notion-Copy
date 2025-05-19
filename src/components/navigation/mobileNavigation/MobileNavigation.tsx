import styles from './styles.module.scss';
import Header from '../components/header/Header';
import NavigationHead from './navigationHead/NavigationHead';
import PageGroup from '../components/pageGroup/PageGroup';
import HomeLink from '../components/homeLink/HomeLink';
import Plus from '@/components/SVGs/Plus';

// create a structure

const MobileNavigation = () => {
	// fetch pages
	const pages = [];

	return (
		<NavigationHead>
			<Header>
				<div />
			</Header>
			<div role="tree" className={`flex-column gap-050`}>
				{/* <div className={`flex-column gap-050`}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} />
					))}
				</div> */}
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
