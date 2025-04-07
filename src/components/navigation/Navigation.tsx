import styles from './navigation.module.scss';
import Header from './components/header/Header';
import Link from 'next/link';
import MoreButton from '../moreButton/MoreButton';
import AddNewPage from '../addNewPage/AddNewPage';
import ChevronRight from '../SVGs/ChevronRight';
import File from '../SVGs/File';
import NavigationHead from './components/navigationHead/NavigationHead';
import PageGroup from './components/pageGroup/PageGroup';

// create a structure
const pages = [
	{ id: 0, name: 'Goals', pages: [{ id: 23, name: 'Subgoals', pages: [] }] },
	{ id: 1, name: 'Dashboard and a long string bla bla bla', children: [] },
];

const Navigation = () => {
	// fetch pages

	return (
		<NavigationHead>
			<Header />
			<div role="tree" className={styles.mainContentContainer}>
				<div className={styles.pages}>
					{pages.map((page) => (
						<PageGroup key={page.id} page={page} />
					))}
				</div>
				<AddNewPage label={'Add new'} buttonClass={styles.newPageBtn} svgClass={styles.plusSvg} />
			</div>
			<Link href="/" className={styles.homeLink} data-css-is-active={false}>
				Home
			</Link>
		</NavigationHead>
	);
};

export default Navigation;
