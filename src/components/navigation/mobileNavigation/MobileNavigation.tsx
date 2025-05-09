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
			<div role="tree" className={styles.mainContentContainer}>
				{/* <div className={styles.pages}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} />
					))}
				</div> */}
				<button className={styles.newPageBtn}>
					<Plus />
					<span>Add new</span>
				</button>
			</div>
			<HomeLink />
		</NavigationHead>
	);
};

export default MobileNavigation;
