import styles from './styles.module.scss';
import HamburgerBtn from '@/components/hamburgerButton/HamburgerBtn';
import MoreButton from '@/components/moreButton/MoreButton';

const PageHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.leftElements}>
				<HamburgerBtn />
				<h1 className={styles.title}>Home</h1>
			</div>
			<MoreButton />
		</header>
	);
};

export default PageHeader;
