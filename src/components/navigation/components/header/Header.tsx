import React from 'react';
import styles from './header.module.scss';
import ChevronRight from '@/components/SVGs/ChevronRight';

const user_name = 'Patrick';

const Header = () => {
	return (
		<div className={styles.container}>
			<span className={styles.userInitial}>{user_name[0]}</span>
			<button className={styles.userNameBtn}>
				{user_name}
				<ChevronRight />
			</button>
			<button className={styles.actionBtn}></button>
			<button className={styles.actionBtn}></button>
		</div>
	);
};

export default Header;
