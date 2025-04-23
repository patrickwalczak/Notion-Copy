import styles from './styles.module.scss';
import Header from '../components/header/Header';
import Link from 'next/link';
import AddNewPage from '../../addNewPage/AddNewPage';
import PageGroup from '../components/pageGroup/PageGroup';

// create a structure
const pages = [
	{ id: 0, name: 'Goals', pages: [{ id: 23, name: 'Subgoals', pages: [] }] },
	{ id: 1, name: 'Dashboard and a long string bla bla bla', children: [] },
];

const TabletNavigation = () => {
	// fetch pages

	return (
		<>
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
		</>
	);
};

export default TabletNavigation;
