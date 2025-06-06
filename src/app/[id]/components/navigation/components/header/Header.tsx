'use client';
import React, { ReactNode } from 'react';
import styles from './header.module.scss';
import ChevronRight from '@/components/SVGs/ChevronRight';

const user_name = 'Patrick';

const Header = ({ children }: { children: ReactNode }) => {
	return (
		<div className={`${styles.container} flex-align-center gap-050 p-y-075 p-x-050`}>
			<span className={`${styles.userInitial} flex-center flex-grow-0 rounded-sm p-050`}>{user_name[0]}</span>
			<button className={`${styles.userNameBtn} flex-align-center flex-grow-1 truncate button-empty gap-050 `}>
				<span className={'truncate'}>{user_name}</span>
				<ChevronRight className="flex-grow-0" />
			</button>
			{children}
		</div>
	);
};

export default Header;
