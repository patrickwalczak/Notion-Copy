'use client';
import React, { ReactNode } from 'react';
import styles from './header.module.scss';
import ChevronRight from '@/components/SVGs/ChevronRight';

const user_name = 'Patrick';

const Header = ({ children }: { children: ReactNode }) => {
	return (
		<div className={styles.container}>
			<span className={styles.userInitial}>{user_name[0]}</span>
			<button className={styles.userNameBtn}>
				{user_name}
				<ChevronRight />
			</button>
			{children}
		</div>
	);
};

export default Header;
