import styles from './styles.module.scss';
import Header from '../components/header/Header';
import PageGroup from '../components/pageGroup/PageGroup';
import NavigationHead from './components/navigationHead/NavigationHead';
import CreatePage from './components/buttons/CreatePage';
import CloseNavigation from './components/buttons/CloseNavigation';
import HomeLink from '../components/homeLink/HomeLink';

// create a structure
const pages = [];

const DesktopNavigation = () => {
	// fetch pages

	return (
		<NavigationHead>
			<Header>
				<CloseNavigation />
				<CreatePage />
			</Header>
			<div role="tree" className={`flex-column gap-1`}>
				<HomeLink />
				{/* <div className={`flex-column gap-025`}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} />
					))}
				</div> */}
			</div>
		</NavigationHead>
	);
};

export default DesktopNavigation;
